// EmailJS konfiguration
// Du skal erstatte disse værdier med dine egne fra EmailJS dashboard

export const EMAIL_CONFIG = {
  // Disse værdier får du fra EmailJS dashboard (https://www.emailjs.com/)
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID', 
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  
  // Din virksomheds email hvor beskeder skal sendes til
  TO_EMAIL: 'emilmh.nw@outlook.dk, mikkelwb.nw@outlook.dk'
};

// Template til EmailJS - dit HTML template skal være sat op således:
/*
Subject: Ny besked til NordWeb fra {{name}}

Content: (HTML template)
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; background-color: #f8fafc; padding: 20px;">
  <div style="background-color: #0077cc; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
    <h2 style="margin: 0; font-size: 20px;">Ny besked til NordWeb</h2>
    <p style="margin: 5px 0 0 0; font-size: 14px;">Modtaget via kontaktformularen</p>
  </div>
  <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <p style="margin: 0 0 10px 0; font-size: 15px;">Hej NordWeb,</p>
    <p style="margin: 0 0 20px 0; font-size: 15px;">I har modtaget en ny besked fra <strong>{{name}}</strong>. Her er detaljerne:</p>
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px; background-color: #f1f5f9; font-weight: bold; width: 120px;">Navn:</td><td style="padding: 8px;">{{name}}</td></tr>
      <tr><td style="padding: 8px; background-color: #f1f5f9; font-weight: bold;">E-mail:</td><td style="padding: 8px;"><a href="mailto:{{email}}" style="color: #0077cc;">{{email}}</a></td></tr>
      <tr><td style="padding: 8px; background-color: #f1f5f9; font-weight: bold;">Tidspunkt:</td><td style="padding: 8px;">{{time}}</td></tr>
      <tr><td style="padding: 8px; background-color: #f1f5f9; font-weight: bold; vertical-align: top;">Besked:</td><td style="padding: 8px;">{{message}}</td></tr>
    </table>
    <p style="margin-top: 20px; font-size: 13px; color: #6b7280;">Denne besked blev sendt automatisk via NordWebs hjemmeside.</p>
  </div>
</div>

Variabler der bruges:
- {{name}} - Kundens navn
- {{email}} - Kundens email  
- {{message}} - Kundens besked
- {{time}} - Tidspunkt (tilføjes automatisk)
*/
