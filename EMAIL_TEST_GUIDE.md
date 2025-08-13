# 🧪 Test Guide - Email Funktionalitet

## Sådan tester du om emails virker:

### 1. **Åbn hjemmesiden**
- Gå til http://localhost:8080/
- Scroll ned til "Kontakt" sektionen

### 2. **Udfyld test formularen**
```
Navn: Test Bruger
Email: test@example.com  
Besked: Dette er en test besked fra hjemmesiden. Hvis I modtager denne email, virker systemet perfekt!
```

### 3. **Send beskeden**
- Klik "Send besked" knappen
- Vent på respons (5-10 sekunder)

### 4. **Mulige resultater:**

**✅ SUCCES:**
- Du ser "Email sendt! 🎉" besked
- Browser konsollen viser "✅ Email sent successfully"
- I modtager en email i jeres Outlook indbakker

**❌ FEJL:**
- Du ser en fejl besked
- Browser konsollen viser fejl detaljer
- Mulige årsager nedenfor

---

## 🔍 Fejlfinding

### **Fejl: "Service ID not found"**
**Løsning:** EmailJS service er ikke sat op korrekt
1. Gå til https://www.emailjs.com/
2. Tjek at service ID matcher: `service_agdyie7`

### **Fejl: "Template ID not found"**  
**Løsning:** EmailJS template mangler
1. Opret template med ID: `template_aislrr1`
2. Kopier HTML templaten fra guiden

### **Fejl: "Public key invalid"**
**Løsning:** Forkert public key
1. Tjek EmailJS dashboard under "Account" → "General"
2. Verificer key: `4s0F8ifPH03r6Muve`

### **Emails sendes, men I modtager dem ikke**
**Mulige årsager:**
- Emails går i spam mappen
- EmailJS service sender fra forkert email
- Template er ikke konfigureret til at sende til jeres Outlook

---

## 📧 Sådan ser emailen ud når den virker:

**Subject:** "Ny besked til NordWeb fra [Navn]"

**Indhold:** Jeres flotte HTML template med:
- Blå header "Ny besked til NordWeb"  
- Tabel med kundens oplysninger
- Klikbart email link
- Professionelt design

---

## 🚀 Når alt virker:

1. **Deploy hjemmesiden** til jeres hosting
2. **Test fra den rigtige domain** 
3. **Emails vil komme fra rigtige kunder**
4. **I kan svare direkte fra Outlook**

Prøv testen nu og fortæl mig hvad der sker! 🎯
