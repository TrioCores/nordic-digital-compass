import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (formData.name.length < 2) {
      newErrors.name = 'Navn skal være mindst 2 tegn';
      isValid = false;
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Indtast en gyldig email adresse';
      isValid = false;
    }

    if (formData.message.length < 10) {
      newErrors.message = 'Besked skal være mindst 10 tegn';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Dynamic import af EmailJS og config for at undgå startup fejl
      const [emailjs, { EMAIL_CONFIG }] = await Promise.all([
        import('@emailjs/browser'),
        import('@/config/email')
      ]);

      // Send email via EmailJS
      const emailData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString('da-DK', {
          timeZone: 'Europe/Copenhagen',
          year: 'numeric',
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log('📧 Sender email med EmailJS...');
      console.log('Service ID:', EMAIL_CONFIG.SERVICE_ID);
      console.log('Template ID:', EMAIL_CONFIG.TEMPLATE_ID);
      console.log('Email data:', emailData);
      
      const result = await emailjs.default.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        emailData,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('✅ Email sent successfully:', result);
      alert('🎉 Email sendt! I modtager en email på jeres Outlook konto.');
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success state after 10 seconds
      setTimeout(() => setIsSubmitted(false), 10000);
      
    } catch (error) {
      console.error('❌ Email send failed:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      let errorMessage = 'Der opstod en fejl ved afsendelse af email.';
      
      if (error && typeof error === 'object' && 'text' in error) {
        errorMessage += ` Fejl: ${error.text}`;
      }
      
      errorMessage += ' Prøv igen eller kontakt os direkte på emilmh.nw@outlook.dk';
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord dark:text-white">
            Klar til at komme i gang?
          </h2>
          
          <p className="text-xl text-primary mb-4 font-semibold">
            📧 Få dit gratis tilbud på under 24 timer
          </p>

          <p className="text-lg text-muted-foreground dark:text-gray-200 max-w-3xl mx-auto">
            Skriv til os nedenfor, så vender vi tilbage med et skræddersyet tilbud til din virksomhed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="space-y-8">
            
            <div className="nordic-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-fjord mb-6">Kontakt information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-fjord">Aalborg, Danmark</p>
                    <p className="text-muted-foreground dark:text-gray-300">Vi arbejder med hele Danmark remote.</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-fjord">kontakt@nordweb.dk</p>
                    <p className="text-muted-foreground dark:text-gray-300">Vi svarer inden for 24 timer</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-fjord">+45 XX XX XX XX</p>
                    <p className="text-muted-foreground dark:text-gray-300">Hverdage 17-00:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live chat info */}
            <div className="nordic-card rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-nordic-gold/5 border border-primary/20">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-nordic-gold mr-3 animate-pulse"></div>
                <h4 className="font-semibold text-fjord">Live support</h4>
              </div>
              <p className="text-muted-foreground dark:text-gray-400 text-sm">
                "Har du spørgsmål? Skriv direkte til os – vi svarer hurtigt."
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="nordic-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-fjord mb-6">Send os en besked</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
                <h4 className="text-xl font-semibold text-fjord mb-2">Email sendt! 🎉</h4>
                <p className="text-muted-foreground mb-2">Jeres besked er sendt til:</p>
                <p className="text-sm font-medium text-primary">emilmh.nw@outlook.dk & mikkelwb.nw@outlook.dk</p>
                <p className="text-muted-foreground mt-2">Vi vender tilbage til dig inden for 24 timer.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-fjord mb-2">Navn</label>
                  <Input 
                    type="text" 
                    placeholder="Dit fulde navn"
                    className="border-border focus:border-primary focus:ring-primary"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fjord mb-2">E-mail</label>
                  <Input 
                    type="email" 
                    placeholder="din@email.dk"
                    className="border-border focus:border-primary focus:ring-primary"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fjord mb-2">Besked</label>
                  <Textarea 
                    placeholder="Fortæl os om dit projekt..."
                    rows={5}
                    className="border-border focus:border-primary focus:ring-primary resize-none"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full nordic-button-primary py-6 text-lg font-semibold group disabled:opacity-70"
                >
                  {isSubmitting ? "Sender..." : "Send besked"}
                  {!isSubmitting && (
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;