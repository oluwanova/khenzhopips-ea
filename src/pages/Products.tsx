import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Zap, Brain, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebaseClient";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  const products = [
    {
      id: "scout", // <-- UPDATED
      icon: <TrendingUp className="w-12 h-12 text-amber-500" />,
      name: "Scout EA v1.0",
      tagline: "The Range Pilot",
      subtitle: "Master of consolidation zones and low-volatility environments. Calm, patient, and surgically precise.",
      features: [
        "Advanced Range Detection Engine: Uses real-time volume-profile analysis",
        "Intelligent Position Management: Adaptive lot sizing based on account equity",
        "Session & Instrument Agnostic: Works on any instrument pair",
        "High-Speed, Low-Latency Execution: <100ms execution latency",
        "Built-in Drawdown Control: Emergency stop protocols"
      ],
      pricing: { monthly: 25, lifetime: 250 },
    },
    {
      id: "navigator", // <-- UPDATED
      icon: <Zap className="w-12 h-12 text-emerald-500" />,
      name: "Navigator EA v2.0",
      tagline: "The Adaptive Hybrid",
      subtitle: "Intelligent market state detection with dynamic strategy switching. Thrives in both trends and ranges.",
      features: [
        "Dynamic Strategy Switching: Automatically identifies market conditions",
        "Volatility Filter: Avoids dangerous, unpredictable market conditions",
        "Multi-Timeframe Confirmation: Uses higher timeframe data",
        "Advanced News Filter: Can pause trading during high-impact news events",
        "Self-Optimizing Logic: Adapts to changing market dynamics"
      ],
      pricing: { monthly: 50, lifetime: 500 },
    },
    {
      id: "sentinel", // <-- UPDATED
      icon: <Brain className="w-12 h-12 text-amber-500" />,
      name: "Sentinel EA v3.0",
      tagline: "The Neural Executor",
      subtitle: "AI-powered execution for high-volatility assets like Gold and Indices. Manages chaos with intelligent precision.",
      features: [
        "Machine Learning Core: Trained on thousands of hours of market data",
        "Dynamic Risk Adjustment: AI model adjusts risk parameters in real-time",
        "Optimized for Volatility: Specifically engineered for chaotic price action",
        "Self-Optimizing Parameters: Periodically re-calibrates its own settings",
        "Neural Pattern Recognition: Identifies complex market structures",
      ],
      pricing: { monthly: 100, lifetime: 1000 },
    },
    {
      id: "guardian", // <-- UPDATED
      icon: <Shield className="w-12 h-12 text-emerald-500" />,
      name: "Tactical Guardian v4.0",
      tagline: "The Hedging Specialist",
      subtitle: "Advanced correlation trading and high-frequency execution for ultimate portfolio protection.",
      features: [
        "Multi-Symbol Correlation Engine: Identifies hedging opportunities across pairs.",
        "Real-Time Risk Balancing: Dynamically adjusts positions to maintain portfolio neutrality.",
        "High-Frequency Execution Logic: Optimized for rapid entry and exit.",
        "Institutional-Grade Drawdown Control: Hard limits and equity protection protocols.",
        "Fully Customizable Symbol Sets: Define your own hedging universe.",
      ],
      pricing: { monthly: 200, lifetime: 2000 },
    },
  ];

  const handleToggleExpand = (productId: string) => setExpandedCard(prev => (prev === productId ? null : productId));

  const handleCryptoPurchase = async (productId: string, productName: string, price: number, planType: 'monthly' | 'lifetime') => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Please log in to purchase.", variant: "destructive" });
      navigate("/login");
      return;
    }
    setPurchasingId(`${productId}-${planType}`);
    try {
      const createInvoiceFn = httpsCallable(functions, 'createNowPaymentsInvoice');
      const result = await createInvoiceFn({ productId, productName, price: String(price), planType });
      const data = result.data as { checkoutUrl: string };
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("Could not retrieve crypto checkout link.");
      }
    } catch (err: any) {
      toast({ title: "Crypto Payment Error", description: err.message, variant: "destructive" });
      setPurchasingId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-6xl text-center">
              <h1 className="mb-6 text-amber-500 text-4xl md:text-5xl">The KhenzhoPips EA Collection</h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Each system represents a generation of evolution—from precision range trading to adaptive AI logic.
              </p>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product) => {
                const isExpanded = expandedCard === product.id;
                return (
                  <Card key={product.id} id={product.id} className="p-8 md:p-12 gradient-card border-primary/20 flex flex-col transition-all duration-300">
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">{product.icon}</div>
                        <div className="flex-1">
                          <h2 className="mb-1 text-xl text-emerald-500">{product.name}</h2>
                          <p className="text-primary font-semibold text-lg mb-4">{product.tagline}</p>
                          <p className="text-muted-foreground text-lg mb-8">{product.subtitle}</p>
                          {isExpanded && (
                            <>
                              <div className="mb-8">
                                <h3 className="text-lg mb-3 text-foreground">Core Features</h3>
                                <ul className="space-y-2">
                                  {product.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span className="text-muted-foreground text-sm">{feature}</span></li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mb-8">
                                <h3 className="text-lg mb-3 text-foreground">Get Your License</h3>
                                <Tabs defaultValue="lifetime" className="w-full">
                                  <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
                                    <TabsTrigger value="monthly">Subscription</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="lifetime">
                                    <Card className="p-4 bg-background/50 border-primary/10">
                                      <div className="text-2xl font-bold text-amber-500 mb-2">${product.pricing.lifetime}</div>
                                      <p className="text-sm text-muted-foreground mb-4">One-time payment for permanent access.</p>
                                      <div className="flex flex-col gap-2">
                                        <Button size="lg" className="w-full" disabled={true}>Pay with Card (Pending)</Button>
                                        <Button size="lg" variant="outline" className="w-full" onClick={() => handleCryptoPurchase(product.id, product.name, product.pricing.lifetime, 'lifetime')} disabled={purchasingId === `${product.id}-lifetime`}>
                                          {purchasingId === `${product.id}-lifetime` ? "Creating..." : "Pay with Crypto"}
                                        </Button>
                                      </div>
                                    </Card>
                                  </TabsContent>
                                  <TabsContent value="monthly">
                                    <Card className="p-4 bg-background/50 border-primary/10">
                                      <div className="text-2xl font-bold text-amber-500 mb-2">${product.pricing.monthly}<span className="text-sm text-muted-foreground">/mo</span></div>
                                      <p className="text-sm text-muted-foreground mb-4">Billed monthly. Renews upon next payment.</p>
                                      <div className="flex flex-col gap-2">
                                        <Button size="lg" className="w-full" disabled={true}>Pay with Card (Pending)</Button>
                                        <Button size="lg" variant="outline" className="w-full" onClick={() => handleCryptoPurchase(product.id, product.name, product.pricing.monthly, 'monthly')} disabled={purchasingId === `${product.id}-monthly`}>
                                          {purchasingId === `${product.id}-monthly` ? "Creating..." : "Pay with Crypto"}
                                        </Button>
                                      </div>
                                    </Card>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleToggleExpand(product.id)} variant="outline" className="mt-auto">
                      {isExpanded ? "Show Less" : "View Details & Purchase Options"}
                    </Button>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;