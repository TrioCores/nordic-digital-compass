import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "kontakt@nordweb.dk",
      action: "mailto:kontakt@nordweb.dk"
    },
    {
      icon: Phone,
      title: "Telefon",
      value: "+45 XX XX XX XX",
      action: "tel:+45XXXXXXXX"
    },
    {
      icon: MapPin,
      title: "Lokation",
      value: "Danmark - vi arbejder med hele Norden",
      action: null
    },
    {
      icon: Clock,
      title: "Åbningstider",
      value: "Man-Fre: 9:00-17:00",
      action: null
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-fjord">
              Kontakt os
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Har du spørgsmål eller er du klar til at komme i gang? 
              Vi er her for at hjælpe dig med at få den perfekte digitale løsning.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-fjord mb-4">
                  Send os en besked
                </h2>
                <p className="text-muted-foreground text-lg">
                  Fortæl os om dit projekt, så vender vi tilbage med et skræddersyet forslag.
                </p>
              </div>

              <Card className="nordic-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-fjord mb-2">
                        Navn *
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full"
                        placeholder="Dit fulde navn"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-fjord mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full"
                        placeholder="din@email.dk"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-fjord mb-2">
                      Virksomhed
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full"
                      placeholder="Din virksomhed (valgfrit)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-fjord mb-2">
                      Besked *
                    </label>
                    <Textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full resize-none"
                      placeholder="Fortæl os om dit projekt, dine ønsker og timeline..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="nordic-button-primary w-full py-6 text-lg"
                  >
                    Send besked
                    <Send className="ml-2" size={20} />
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-fjord mb-4">
                  Kontakt information
                </h2>
                <p className="text-muted-foreground text-lg">
                  Vi svarer typisk inden for 24 timer og tilbyder gratis konsultation til alle nye projekter.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="nordic-card p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <info.icon className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-fjord mb-1">
                          {info.title}
                        </h3>
                        {info.action ? (
                          <a 
                            href={info.action}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="nordic-card p-8 bg-gradient-to-br from-primary/5 to-nordic-gold/5 border border-primary/10">
                <div className="text-center">
                  <MessageCircle className="text-primary mx-auto mb-4" size={32} />
                  <h3 className="text-xl font-bold text-fjord mb-3">
                    Har du brug for hurtig hjælp?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Book et uforpligtende videomøde, så kan vi tale om dit projekt i detaljer.
                  </p>
                  <Button 
                    size="lg" 
                    className="nordic-button-primary px-8 py-6"
                    onClick={() => window.open("https://calendly.com/nordweb", "_blank")}
                  >
                    Book gratis møde
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-card to-nordic-gold/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fjord mb-6">
              Ofte stillede spørgsmål
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Her er svarene på de mest almindelige spørgsmål vi får om vores services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="nordic-card p-6">
              <h3 className="font-bold text-fjord mb-3">Hvor lang tid tager det at få en hjemmeside?</h3>
              <p className="text-muted-foreground">Typisk 2-4 uger fra projektstart til lancering, afhængigt af kompleksitet og indhold.</p>
            </Card>
            
            <Card className="nordic-card p-6">
              <h3 className="font-bold text-fjord mb-3">Er der binding på abonnementet?</h3>
              <p className="text-muted-foreground">Nej, kun løbende måned + 1 måneds opsigelse. Du ejer din hjemmeside.</p>
            </Card>
            
            <Card className="nordic-card p-6">
              <h3 className="font-bold text-fjord mb-3">Hvad er inkluderet i support?</h3>
              <p className="text-muted-foreground">Teknisk support, mindre ændringer, sikkerhedsopdateringer og backup.</p>
            </Card>
            
            <Card className="nordic-card p-6">
              <h3 className="font-bold text-fjord mb-3">Kan I lave specialfunktioner?</h3>
              <p className="text-muted-foreground">Ja, vi skræddersyer løsninger. Kontakt os for et tilbud på dit specifikke behov.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;