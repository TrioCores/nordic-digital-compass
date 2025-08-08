import { useState } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
}

interface UseSecureInputProps {
  initialValue?: string;
  rules?: ValidationRules;
}

export const useSecureInput = ({ initialValue = '', rules = {} }: UseSecureInputProps) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const sanitizeInput = (input: string): string => {
    // Basic XSS prevention - remove HTML tags and dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  const validateInput = (input: string): string | null => {
    const sanitized = sanitizeInput(input);

    if (rules.required && !sanitized) {
      return 'Dette felt er påkrævet';
    }

    if (rules.minLength && sanitized.length < rules.minLength) {
      return `Minimum ${rules.minLength} tegn påkrævet`;
    }

    if (rules.maxLength && sanitized.length > rules.maxLength) {
      return `Maksimum ${rules.maxLength} tegn tilladt`;
    }

    if (rules.email && sanitized) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitized)) {
        return 'Ugyldig email adresse';
      }
    }

    if (rules.pattern && sanitized && !rules.pattern.test(sanitized)) {
      return 'Ugyldigt format';
    }

    return null;
  };

  const handleChange = (newValue: string) => {
    const sanitized = sanitizeInput(newValue);
    setValue(sanitized);
    
    const validationError = validateInput(sanitized);
    setError(validationError);
  };

  const isValid = error === null && (rules.required ? value.length > 0 : true);

  return {
    value,
    error,
    isValid,
    onChange: handleChange,
    validate: () => {
      const validationError = validateInput(value);
      setError(validationError);
      return validationError === null;
    }
  };
};