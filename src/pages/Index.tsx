import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Bot, BarChart3, CheckCircle2, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Built From Real-World Experience",
      description: "Every algorithm was forged in the fire of real markets. Born from over a decade of trial, failure, and relentless refinement, our systems encapsulate painful lessons learned, so you don't have to repeat them."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Radically Data-Driven & Transparent",
      description: "We trade verifiable data, not theories. All logic is statistically validated. Our results are tracked live by third-party services like MyFXBook—no cherry-picked backtests, no hidden realities."
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Fully Automated for Psychological Freedom",
      description: "Our systems are engineered to eliminate the greatest threats to a trader's success: fear, greed, and impatience. You define your risk, and the EA executes with unwavering discipline, 24/7."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Engineered for All Traders & Markets",
      description: "Whether you're a beginner needing a reliable start or a professional managing complex portfolios, our EAs are your edge. They are designed for universal application across all instrument pairs."
    }
  ];

  const eaSystems = [
    {
      name: "Scout EA v1.0",
      tagline: "The Range Pilot",
      description: "Master of consolidation zones and low-volatility environments. Calm, patient, and surgically precise.",
      bestFor: "Beginners, Asian session specialists, low-risk portfolios",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "Navigator EA v2.0",
      tagline: "The Adaptive Hybrid",
      description: "Intelligent market state detection with dynamic strategy switching. Thrives in both trends and ranges.",
      bestFor: "Intermediate traders, all-market conditions, balanced growth",
      gradient: "from-cyan-500/20 to-teal-500/20"
    },
    {
      name: "Sentience EA v3.0",
      tagline: "The Neural Executor",
      description: "AI-powered execution for high-volatility assets like Gold and Indices. Manages chaos with intelligent precision.",
      bestFor: "Experienced traders, aggressive growth, volatile instruments",
      gradient: "from-teal-500/20 to-emerald-500/20"
    },
    {
      name: "Tactical Guardian v4.0",
      tagline: "The Hedging Specialist (Coming Soon)",
      description: "Advanced correlation trading and high-frequency execution for ultimate portfolio protection.",
      bestFor: "Professional traders, portfolio managers, advanced hedging",
      gradient: "from-emerald-500/20 to-green-500/20",
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="mb-6">
            KhenzhoPips Automated Trading Systems:<br />
            <span className="gradient-primary bg-clip-text text-transparent">
              Where Precision Meets Performance
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Advanced algorithmic solutions engineered for disciplined traders seeking a statistical edge. 
            We transform complex market data into systematic, emotion-free opportunities, accessible to everyone.
          </p>
          
          {/* Founder Quote */}
          <Card className="max-w-4xl mx-auto p-8 mb-8 bg-card/50 border-primary/20">
            <p className="text-lg italic text-muted-foreground mb-4">
              "After losing everything to trading scams and empty promises, I dedicated my life to building what I wished existed: 
              transparent, statistically-verified trading systems that actually work. Trading shouldn't be gambling—it should be engineering. 
              These tools are the result of that mission."
            </p>
            <p className="font-semibold">— Khenzho (Psalmuel), Founder & System Architect</p>
          </Card>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary shadow-glow">
              <Link to="/products">Explore The EA Systems</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/performance">See Live Verified Performance</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center mb-4">Why KhenzhoPips is Different</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Built on a foundation of transparency, statistical rigor, and real-world battle testing
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 gradient-card border-primary/10 hover:border-primary/30 transition-smooth shadow-card">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EA Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center mb-4">The EA Collection Showcase</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Four generations of evolution, each designed for specific market conditions and trader experience levels
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {eaSystems.map((ea, index) => (
              <Card key={index} className={`p-8 bg-gradient-to-br ${ea.gradient} border-primary/20 hover:border-primary/40 transition-smooth relative overflow-hidden group`}>
                {ea.comingSoon && (
                  <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </div>
                )}
                <h3 className="mb-2">{ea.name}</h3>
                <p className="text-primary font-semibold mb-4">{ea.tagline}</p>
                <p className="text-muted-foreground mb-6">{ea.description}</p>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Best For:</p>
                  <p className="text-sm font-medium">{ea.bestFor}</p>
                </div>
                {ea.comingSoon ? (
                  <Button variant="outline" className="w-full" disabled>
                    Join The Early Access Waitlist
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary/10 transition-smooth">
                    <Link to="/products">
                      Explore {ea.name.split(' ')[0]}'s Methodology →
                    </Link>
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4">Trust & Verification - Our Proof is Public</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Edge should be proven, not just promised. We invite you to scrutinize our live results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 gradient-card">
              <div className="text-3xl font-bold text-primary mb-2">9,000+</div>
              <p className="text-muted-foreground">Hours of Forward-Testing</p>
            </Card>
            <Card className="p-6 gradient-card">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Live Performance Monitoring</p>
            </Card>
            <Card className="p-6 gradient-card">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Transparent Results</p>
            </Card>
          </div>

          <Button asChild size="lg" className="gradient-primary shadow-glow">
            <Link to="/performance">
              View All Verified Performance Reports <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6">Discipline. Data. Peace of Mind.</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join a global community of traders who are leaving emotional guesswork behind and embracing 
            a new era of systematic, data-driven execution.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Join Our Telegram Community</Link>
            </Button>
            <Button asChild size="lg" className="gradient-primary shadow-glow">
              <Link to="/products">Purchase Your EA</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
