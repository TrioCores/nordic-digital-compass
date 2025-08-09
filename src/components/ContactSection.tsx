import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fjord">
            Kontakt os
          </h2>
          
          <p className="text-xl text-primary mb-4 font-semibold">
            Har du spørgsmål? Klar til at komme i gang?
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
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-fjord mb-2">Navn</label>
                <Input 
                  type="text" 
                  placeholder="Dit fulde navn"
                  className="border-border focus:border-primary focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fjord mb-2">E-mail</label>
                <Input 
                  type="email" 
                  placeholder="din@email.dk"
                  className="border-border focus:border-primary focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fjord mb-2">Besked</label>
                <Textarea 
                  placeholder="Fortæl os om dit projekt..."
                  rows={5}
                  className="border-border focus:border-primary focus:ring-primary resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full nordic-button-primary py-6 text-lg font-semibold group"
              >
                Send besked
                <Send className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;