import { Card } from "@/components/ui/card";
import { BarChart3, Code, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const pillars = [
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Statistics & Probability",
      description: "Every decision backed by data-backed equations and proven statistical edges. No hope, only mathematics."
    },
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Advanced Programming & Psychological Removal",
      description: "Algorithms that execute flawlessly without fear, greed, or hesitation. Pure logic, zero emotion."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Continuous Evolution & Adaptation",
      description: "Regular updates and strategy optimizations based on changing market dynamics and user feedback."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="mb-6">The Pursuit of True Edge: My Journey Through Fire</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Trading is not about luck or secret indicators—it's about structure, psychology, and verifiable data.
            </p>
          </div>
        </section>

        {/* Founder Introduction */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 md:p-12 gradient-card border-primary/20">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full gradient-primary flex items-center justify-center text-5xl font-bold shadow-glow">
                    K
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="mb-2">Khenzho (Psalmuel)</h2>
                  <p className="text-primary font-semibold text-xl mb-4">Founder & System Architect</p>
                  <p className="text-muted-foreground">
                    Visionary leader driving the mission to build transparent, statistically-verified trading systems 
                    that actually work. Over a decade of experience transforming market chaos into systematic profit.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-center mb-12">The Origin Story: My Beginning in the Noise (2012)</h2>
            <Card className="p-8 md:p-12 gradient-card">
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg">
                  I entered this industry like most—full of hope, hungry for freedom, and completely unprepared for the 
                  brutal reality of financial markets. I was a student, barely 20 years old, and I spent my tuition fees 
                  chasing signals from "gurus" on Telegram.
                </p>
                <p className="text-lg">
                  I lost everything. Not once, but three times. Each time, I thought I had found "the system" that would 
                  change my life. Each time, I was wrong. The pain of those losses—financial, emotional, psychological—was 
                  unbearable.
                </p>
                <p className="text-lg">
                  But somewhere in that darkness, something shifted. I stopped looking for shortcuts and started studying. 
                  Really studying. Market structure, probability theory, algorithmic trading, quantitative finance. 
                  I dedicated years to understanding not just how to trade, but how to engineer trading systems.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Transformation */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-center mb-12">The Transformation: From Emotional Gambler to Data Engineer</h2>
            <Card className="p-8 md:p-12 gradient-card border-primary/20">
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg">
                  The turning point came when I realized that my biggest enemy wasn't the market—it was myself. 
                  My emotions, my biases, my need to be right. So I decided to remove myself from the equation entirely.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-background/50 rounded-r-lg">
                  <p className="text-lg italic mb-4">
                    "The market is a machine. My goal was to teach my EA to think like an engineer, not a gambler. 
                    It doesn't get scared, it doesn't get greedy—it simply executes its statistical edge."
                  </p>
                  <p className="text-primary font-semibold">— Khenzho</p>
                </blockquote>
                <p className="text-muted-foreground text-lg">
                  I spent the next five years building, testing, failing, and rebuilding. Every version of the KhenzhoPips 
                  EA represents thousands of hours of coding, backtesting, and forward-testing. Every loss taught me something. 
                  Every win validated a hypothesis.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-center mb-12">The KhenzhoPips Philosophy: Our Three Core Pillars</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((pillar, idx) => (
                <Card key={idx} className="p-8 gradient-card border-primary/20 hover:border-primary/40 transition-smooth">
                  <div className="mb-6">{pillar.icon}</div>
                  <h3 className="text-xl mb-4">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 md:p-12 gradient-card border-primary/20 text-center">
              <h2 className="mb-6">My Promise to You: I Don't Sell Hype. I Sell Peace of Mind.</h2>
              <p className="text-muted-foreground text-lg mb-6">
                I don't claim you'll get rich overnight. I don't promise 1000% returns. What I do promise is this:
              </p>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Transparency:</strong> All our performance data is live and verifiable.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Continuous Improvement:</strong> We never stop researching and testing.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Education:</strong> We teach you how to think, not just what to buy.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1 text-xl">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Support:</strong> We're in this together. Your success is our success.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
