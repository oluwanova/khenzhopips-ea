import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Zap, Brain, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Products = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const products = [
    {
      id: "scout",
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
      performance: {
        profitFactor: "1.82",
        maxDrawdown: "7.6%",
        sharpeRatio: "1.45",
        recoveryFactor: "3.12"
      },
      pricing: [
        { type: "Lifetime", price: "$497", description: "Permanent access & all v1.x updates." },
        { type: "Monthly", price: "$97/mo", description: "Full access, cancel anytime." }
      ]
    },
    {
      id: "navigator",
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
      performance: {
        profitFactor: "2.15",
        maxDrawdown: "12.3%",
        sharpeRatio: "1.68",
        recoveryFactor: "4.21"
      },
      pricing: [
        { type: "Lifetime", price: "$697", description: "Permanent access & all v2.x updates." },
        { type: "Monthly", price: "$127/mo", description: "Full access, cancel anytime." }
      ]
    },
    {
      id: "sentinel",
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
      performance: {
        profitFactor: "2.45",
        maxDrawdown: "18.5%",
        sharpeRatio: "1.92",
        recoveryFactor: "5.33",
      },
      pricing: [
        { type: "Lifetime", price: "$997", description: "Permanent access & all v3.x updates." },
        { type: "Monthly", price: "$197/mo", description: "Full access, cancel anytime." },
      ],
    },
    {
      id: "guardian",
      icon: <Shield className="w-12 h-12 text-emerald-500" />,
      name: "Tactical Guardian v4.0",
      tagline: "The Hedging Specialist",
      subtitle: "Advanced correlation trading and high-frequency execution for ultimate portfolio protection. For professional and institutional traders.",
      features: [],
      performance: {},
      pricing: [],
      comingSoon: true,
    },
  ];

  const handleToggleExpand = (productId: string) => {
    setExpandedCard(prev => (prev === productId ? null : productId));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="mb-6 text-amber-500 text-4xl md:text-5xl">The KhenzhoPips EA Collection</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Each version of the KhenzhoPips EA represents a generation of evolution—from precision range trading 
              to adaptive AI logic. These systems are designed to be powerful, flexible tools for traders of all levels.
            </p>
          </div>
        </section>

        {/* Audience Guide */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 gradient-card">
                <h3 className="text-xl mb-3 text-foreground">For the Beginner</h3>
                <p className="text-muted-foreground">
                  Our EAs offer a 'plug-and-play' experience. With our clear guides and preset files, 
                  you can get started on a demo account in minutes.
                </p>
              </Card>
              <Card className="p-6 gradient-card">
                <h3 className="text-xl mb-3 text-foreground">For the Intermediate Trader</h3>
                <p className="text-muted-foreground">
                  Use the EAs as your tireless assistant. Let them scan the markets, manage entries, 
                  and handle exits based on your strategic direction.
                </p>
              </Card>
              <Card className="p-6 gradient-card">
                <h3 className="text-xl mb-3 text-foreground">For the Professional Trader</h3>
                <p className="text-muted-foreground">
                  Integrate our EAs into your workflow to manage trades with flawless precision and 
                  execute complex risk management protocols 24/7.
                </p>
              </Card>
            </div>

            {/* Products */}
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product) => {
                const isExpanded = expandedCard === product.id;
                return (
                <Card key={product.id} id={product.id} className={`p-8 md:p-12 gradient-card border-primary/20 flex flex-col transition-all duration-300 ${product.comingSoon ? 'opacity-75' : ''}`}>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {product.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {product.comingSoon && (
                          <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
                            Coming Soon
                          </div>
                        )}
                        <h2 className="mb-1 text-xl text-emerald-500">{product.name}</h2>
                        <p className="text-primary font-semibold text-lg mb-4">{product.tagline}</p>
                        <p className="text-muted-foreground text-lg mb-8">{product.subtitle}</p>

                        {!product.comingSoon && isExpanded && (
                          <>
                            {/* Features */}
                            <div className="mb-8">
                              <h3 className="text-lg mb-3 text-foreground">Core Features</h3>
                              <ul className="space-y-2">
                                {product.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-primary mt-1">✓</span>
                                    <span className="text-muted-foreground text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Pricing */}
                            <div className="mb-8">
                              <h3 className="text-lg mb-3 text-foreground">Pricing Options</h3>
                              <div className="grid sm:grid-cols-2 gap-4">
                                {product.pricing.map((option, idx) => (
                                  <Card key={idx} className="p-4 bg-background/50 border-primary/10 hover:border-amber-500/30 transition-smooth">
                                    <div className="text-xs text-muted-foreground mb-1 font-semibold">{option.type}</div>
                                    <div className="text-xl font-bold text-amber-500 mb-2">{option.price}</div>
                                    <p className="text-xs text-muted-foreground mb-3">{option.description}</p>
                                    <Button size="sm" className="w-full gradient-primary">Select Plan</Button>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {product.comingSoon ? (
                    <Button variant="outline" size="lg" disabled className="mt-auto">
                      Join The Early Access Waitlist
                    </Button>
                  ) : (
                    <Button onClick={() => handleToggleExpand(product.id)} variant="outline" className="mt-auto">
                      {isExpanded ? "Show Less" : "View Details & Pricing"}
                    </Button>
                  )}
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
