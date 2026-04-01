import { useState } from "react";
import { MapPin, Mail, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { content } from "@/data/content";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const encode = (data: Record<string, string>) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact-form", ...form }),
      })
        .then(() => {
          toast({ title: "Message sent", description: "Thank you for reaching out. We'll be in touch shortly." });
          setForm({ name: "", email: "", subject: "", message: "" });
        })
        .catch((error) => {
          toast({ variant: "destructive", title: "Error", description: "Sorry, there was a problem sending your message." });
          console.error(error);
        });
    };

    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <section className="hero-gradient pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container mx-auto px-6 lg:px-12">
            <AnimatedSection>
              <div className="line-accent mb-8" />
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">Contact Us</h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Connect with our team to discuss partnerships, investment opportunities, or general inquiries.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
              {/* Info */}
              <AnimatedSection>
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Get in Touch</p>
                    <p className="text-muted-foreground leading-relaxed">
                      We welcome conversations with institutional investors, strategic partners, founders, and advisors.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">General Inquiries</p>
                        <p className="text-sm text-muted-foreground">{content.contact.emails.general}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Partnerships & Capital</p>
                        <p className="text-sm text-muted-foreground">{content.contact.emails.partnerships}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Global Presence</p>
                        <p className="text-sm text-muted-foreground">{content.contact.locations.join(" | ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Form */}
              <AnimatedSection delay={0.2} className="lg:col-span-2">
                <form 
                  name="contact-form" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact-form" />
                  <p className="hidden">
                    <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Name</label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Email</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Subject</label>
                    <input
                      required
                      name="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Message</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-gold-light transition-all duration-300 flex items-center gap-2"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              </AnimatedSection>
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default Contact;
