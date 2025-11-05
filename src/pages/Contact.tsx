import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, Mail, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebaseClient"; // <-- STEP 1: Import the database
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // <-- STEP 2: Import Firestore functions

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // <-- Add loading state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    message: ""
  });

  // STEP 3: Replace the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.firstName || !formData.email || !formData.message || !formData.service) {
      toast({ title: "Error", description: "Please fill out all required fields.", variant: "destructive" });
      setLoading(false);
      return;
    }

    try {
      const messagesCollectionRef = collection(db, "messages");
      await addDoc(messagesCollectionRef, {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        createdAt: serverTimestamp(),
        read: false,
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      // Clear the form on successful submission
      setFormData({ firstName: "", lastName: "", email: "", service: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const contactMethods = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "WhatsApp",
      description: "Quick support & inquiries",
      handle: "+234 705 323 8050",
      link: "https://wa.me/2347053238050"
    },
    {
      icon: <Send className="w-8 h-8 text-primary" />,
      title: "Telegram",
      description: "Join our trading community",
      handle: "@KhenzhoPips",
      link: "https://t.me/khenzhopips"
    },
    {
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: "Email",
      description: "Business and partnership inquiries",
      handle: "khenzhopips@gmail.com",
      link: "mailto:khenzhopips@gmail.com"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="mb-6 text-amber-500 text-4xl md:text-5xl">Join KhenzhoPips' Edge</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Ready to begin your journey? Get in touch and take the first step towards financial independence.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Connect Column */}
              <div>
                <div className="space-y-6 mb-12">
                  {contactMethods.map((method, idx) => (
                    <Card key={idx} className="p-6 gradient-card border-primary/20 hover:border-primary/40 transition-smooth">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{method.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl mb-2 text-foreground">{method.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                          <p className="text-primary font-semibold mb-3">{method.handle}</p>
                          <Button asChild variant="outline" size="sm">
                            <a href={method.link} target="_blank" rel="noopener noreferrer">
                              {method.title === "Email" ? "Send Email" : `Message Us`}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-8 gradient-card border-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <Users className="w-12 h-12 text-primary" />
                    <div>
                      <h3 className="text-xl text-foreground">Community & Support</h3>
                      <p className="text-muted-foreground text-sm">Join thousands of successful traders</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">5,000+</div>
                      <div className="text-xs text-muted-foreground">Community Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                      <div className="text-xs text-muted-foreground">Support Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">100%</div>
                      <div className="text-xs text-muted-foreground">Response Rate</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Form Column */}
              <div>
                <Card className="p-8 gradient-card border-primary/20">
                  <h2 className="mb-2 text-emerald-500 text-3xl md:text-4xl">Send Us a Message</h2>
                  <p className="text-muted-foreground mb-8">
                    Have questions? Fill out the form and we'll get back to you within 24 hours.       
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required className="mt-2" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="service">Service Interest</Label>
                      <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Select a topic" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Question</SelectItem>
                          <SelectItem value="presale">Pre-Sale Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={6} className="mt-2" />
                    </div>
                    <Button type="submit" className="w-full gradient-primary shadow-glow" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;