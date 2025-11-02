import { Card } from "@/components/ui/card";
import { BookOpen, Video, BarChart, Brain } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Learn = () => {
  const beginnerModules = [
    {
      number: "1.1",
      title: "How Algorithmic Systems Think: The Logic Behind EAs",
      icon: <Brain className="w-8 h-8 text-primary" />,
      description: "Before you can master a tool, you must understand how it works. This module breaks down the fundamental logic of an Expert Advisor.",
      topics: ["The If-Then Framework", "Parameters vs. Strategy", "Why EAs are Unemotional"]
    },
    {
      number: "1.2",
      title: "Setting Up MT5 and Your First EA",
      icon: <Video className="w-8 h-8 text-primary" />,
      description: "A practical, hands-on guide to getting started. We walk you through every click, from downloading MetaTrader 5 to seeing the KhenzhoPips EA active.",
      topics: ["MT5 Installation", "EA Installation & Activation", "First Login & Permissions"]
    },
    {
      number: "1.3",
      title: "Core Concepts: Understanding Drawdown, Profit Factor, and Leverage",
      icon: <BarChart className="w-8 h-8 text-primary" />,
      description: "To trade responsibly, you must speak the language of risk and performance. This essential module defines the critical metrics.",
      topics: ["Drawdown", "Profit Factor", "Leverage", "Risk Management Basics"]
    },
    {
      number: "1.4",
      title: "The Psychology of Automation: Letting Go of Control",
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      description: "One of the biggest challenges for a new EA user is fighting the urge to interfere. This module addresses the psychological shift required.",
      topics: ["Trusting the System", "Patience and Probabilities", "The Supervisor's Mindset"]
    }
  ];

  const intermediateModules = [
    {
      number: "2.1",
      title: "Using an EA as a Trading Assistant",
      description: "Move beyond 'set-and-forget.' Explore a hybrid approach where you identify high-probability setups and the EA manages the trade."
    },
    {
      number: "2.2",
      title: "Risk Management Masterclass",
      description: "This is the most important module in the academy. We dive deep into the input settings that control your risk."
    },
    {
      number: "2.3",
      title: "Backtesting vs. Forward Testing",
      description: "How can you trust a strategy will work in the future? The answer is rigorous testing. This module explains both critical methods."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="mb-6">Welcome to the KhenzhoPips EA Academy</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              This is your central hub for mastering the art and science of automated trading. 
              We believe that the most successful traders are the most knowledgeable ones. Let's begin.
            </p>
          </div>
        </section>

        {/* Part 1: Beginners */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="mb-4">Part 1: For Beginners — Building a Strong Foundation</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                This foundational course is designed for new traders. Our goal is to demystify algorithmic trading, 
                build your confidence, and equip you with the core knowledge needed to operate the KhenzhoPips EA safely and effectively.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {beginnerModules.map((module) => (
                <Card key={module.number} className="p-8 gradient-card border-primary/20 hover:border-primary/40 transition-smooth">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">{module.icon}</div>
                    <div className="flex-1">
                      <div className="text-primary font-semibold mb-2">Module {module.number}</div>
                      <h3 className="text-xl mb-3">{module.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{module.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold mb-2">Topics Covered:</div>
                    <ul className="space-y-1">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="text-primary">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>

            {/* Example Content */}
            <Card className="mt-8 p-8 gradient-card border-primary/20">
              <h3 className="text-2xl mb-6">Example: The "If-Then" Framework</h3>
              <div className="space-y-6">
                <div className="bg-background/50 p-6 rounded-lg">
                  <div className="text-primary font-semibold mb-2">Example 1 (Entry):</div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">IF</strong> the 50-period Moving Average crosses above the 200-period Moving Average (a "Golden Cross"), 
                    <strong className="text-foreground"> THEN</strong> open a BUY trade
                  </p>
                </div>
                <div className="bg-background/50 p-6 rounded-lg">
                  <div className="text-primary font-semibold mb-2">Example 2 (Exit):</div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">IF</strong> the trade is in profit by 20 pips AND the RSI indicator moves above 70 (overbought), 
                    <strong className="text-foreground"> THEN</strong> close 50% of the position to take profit
                  </p>
                </div>
                <div className="bg-background/50 p-6 rounded-lg">
                  <div className="text-primary font-semibold mb-2">Example 3 (Risk):</div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">IF</strong> the total floating loss of all open trades reaches 5% of the account equity, 
                    <strong className="text-foreground"> THEN</strong> immediately close all positions
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Part 2: Intermediate */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="mb-4">Part 2: For Intermediate Traders — Enhancing Your Edge</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                You've mastered the basics. This next-level course is about optimization, strategic implementation, 
                and using the EA to enhance your own trading intelligence.
              </p>
            </div>

            <div className="space-y-6">
              {intermediateModules.map((module) => (
                <Card key={module.number} className="p-8 gradient-card border-primary/20 hover:border-primary/40 transition-smooth">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center font-bold shadow-glow">
                        {module.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-3">{module.title}</h3>
                      <p className="text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Risk Management Highlight */}
            <Card className="mt-8 p-8 gradient-card border-primary/20">
              <h3 className="text-2xl mb-6">Critical Risk Management Parameters</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background/50 p-6 rounded-lg">
                  <div className="text-primary font-semibold mb-3">Position Sizing (The 1% Rule)</div>
                  <p className="text-muted-foreground text-sm">
                    Never risk more than 1-2% of total account equity on any single trade. This is the foundation of survival.
                  </p>
                </div>
                <div className="bg-background/50 p-6 rounded-lg">
                  <div className="text-primary font-semibold mb-3">The Sequence Multiplier</div>
                  <p className="text-muted-foreground text-sm">
                    Controls lot size increase in recovery sequences. We recommend 1.3 to 1.5 for optimal risk balance.
                  </p>
                </div>
                <div className="bg-background/50 p-6 rounded-lg">
                  <div className="text-primary font-semibold mb-3">Equity Protection</div>
                  <p className="text-muted-foreground text-sm">
                    Use MaxEquityDrawdownPercent as a circuit breaker to protect your account from catastrophic losses.
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

export default Learn;
