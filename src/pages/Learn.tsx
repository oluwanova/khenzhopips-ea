import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Learn = () => {
  const beginnerModules = [
    {
      emoji: "📘",
      title: "How Algorithmic Systems Think: The Logic Behind EAs",
      objective: "To understand how Expert Advisors make trading decisions using structured, unemotional logic.",
      explanation: "An EA doesn’t trade based on feelings or intuition — it executes rules. It reads market data, checks predefined conditions, and acts only when logic aligns.",
      topics: [
        { name: "The If–Then Framework", description: "The EA operates through conditional statements: “IF condition A is true, THEN execute action B.” Example: IF the 50-MA crosses above 200-MA, THEN open a BUY position." },
        { name: "Parameters vs. Strategy", description: "Parameters are inputs you can change (lot size, TP, SL, multiplier). Strategy is the underlying decision logic — how those parameters interact with market data." },
        { name: "Why EAs Are Unemotional", description: "EAs don’t feel fear, greed, or impatience. They can execute your plan precisely — but only if the plan itself is well-structured." }
      ],
      keyInsight: "An EA doesn’t remove risk — it removes emotion. The rest is up to your logic."
    },
    {
      emoji: "💻",
      title: "Setting Up MT5 and Your First EA",
      objective: "To get you comfortable with MetaTrader 5 (MT5) and help you install and activate the KhenzhoPips EA.",
      explanation: null,
      topics: [
        { name: "Installing MT5", description: "Download from your broker’s website or the official MetaQuotes site. Install and log in to your trading account." },
        { name: "Installing the EA", description: "Copy KhenzhoPips EA.ex5 to your MQL5 → Experts folder. Restart MT5 and refresh your Expert Advisors list." },
        { name: "Account Verification & Login", description: "Visit KhenzhoPips EA Login Portal. Create your account with a valid email and password. Use these credentials inside the EA login panel on MT5." },
        { name: "Activating the EA", description: "Drag the EA onto a chart → Enter your email/password → Click Login. Turn on Algo Trading (green icon)." }
      ],
      keyInsight: "Setup is not just about installation — it’s about securing your system and preparing for consistent execution."
    },
    {
      emoji: "📊",
      title: "Core Concepts: Understanding Drawdown, Profit Factor, and Leverage",
      objective: "To help traders understand the language of performance — so you can measure success and control risk.",
      explanation: null,
      topics: [
        { name: "Drawdown", description: "The temporary decline in account equity from a high to a low point. It’s not failure — it’s a measure of risk tolerance." },
        { name: "Profit Factor", description: "Formula: Gross Profit ÷ Gross Loss. A ratio above 1.5 is healthy; above 2.0 indicates strong consistency." },
        { name: "Leverage", description: "Allows traders to control large positions with smaller capital. Example: 1:100 leverage means $1 controls $100 of market exposure. Remember: Leverage magnifies both gains and losses." },
        { name: "Risk Management Basics", description: "Never risk more than 1–2% per trade. Always define a stop loss. Protect capital before chasing profit." }
      ],
      keyInsight: "Drawdown tells your story of survival. Profit Factor tells your story of precision."
    },
    {
      emoji: "🧠",
      title: "The Psychology of Automation: Letting Go of Control",
      objective: "To help traders trust the EA and stop emotional interference.",
      explanation: null,
      topics: [
        { name: "Trusting the System", description: "Once you define your logic, let the EA execute it. Manual interference breaks the statistical edge." },
        { name: "Patience and Probabilities", description: "Not every trade wins. But over hundreds of trades, consistency wins the war." },
        { name: "The Supervisor’s Mindset", description: "Your role is not to “trade.” Your role is to supervise, analyze, and adjust parameters logically." }
      ],
      keyInsight: "Automation doesn’t mean inaction. It means replacing emotional reaction with structured supervision."
    }
  ];

  const intermediateModules = [
    {
      emoji: "🤖",
      title: "Using an EA as a Trading Assistant",
      objective: "To teach traders how to combine human analysis with algorithmic execution.",
      topics: [
        { name: "Hybrid Trading Approach", description: "You identify setups; the EA manages trade entries, exits, and risk." },
        { name: "Reducing Decision Fatigue", description: "The EA handles timing and management, freeing your mental energy." },
        { name: "Automation as Discipline", description: "Let the EA handle repetitive tasks — your focus should be on structure and data." }
      ],
      keyInsight: "Use the EA as your logic partner — not your replacement."
    },
    {
      emoji: "💣",
      title: "Risk Management Masterclass",
      objective: "To master the internal parameters that control your account’s safety.",
      topics: [
        { name: "Position Sizing (The 1% Rule)", description: "Risk 1–2% per trade — this prevents emotional pressure." },
        { name: "Sequence Multiplier (Martingale Recovery)", description: "Controls how lot size increases after a loss. Recommended: 1.3–1.5 to maintain recovery without overexposure." },
        { name: "Equity Protection", description: "MaxEquityDrawdownPercent stops trading automatically when a loss threshold is reached." },
        { name: "Mathematics of Survival", description: "The more you protect, the longer you last. Longevity beats aggression every time." }
      ],
      keyInsight: "Trading is not about doubling your money — it’s about not losing it faster than you can recover it."
    },
    {
      emoji: "🧪",
      title: "Backtesting vs. Forward Testing",
      objective: "To ensure your strategy works under real and historical conditions.",
      topics: [
        { name: "Backtesting", description: "Simulate historical performance using MT5 Strategy Tester. Validate logic and optimize parameters." },
        { name: "Forward Testing", description: "Run the EA live on a demo account. Observe performance in real-time conditions (spread, slippage, latency)." },
        { name: "Statistical Validation", description: "Look for consistent patterns, not lucky streaks." }
      ],
      keyInsight: "Backtesting builds belief. Forward testing builds trust."
    },
    {
      emoji: "🌍",
      title: "Understanding Symbol Differences",
      objective: "To teach traders that every market behaves differently — and why your EA must adapt.",
      topics: [
        { name: "Volatility & Volume", description: "Gold moves fast and wide. EURUSD moves slow and steady. Adjust your lot size and pip distance accordingly." },
        { name: "Session Sensitivity", description: "GBPJPY reacts during London–New York overlaps. Crypto trades 24/7 without breaks." },
        { name: "Time Zone Responsiveness", description: "Know when your pair is most active to optimize EA performance." },
        { name: "Tutorial Support", description: "Watch our beginner tutorials to understand symbol behavior, risk logic, and money management." }
      ],
      keyInsight: "The market doesn’t change for you — your system must adapt to it."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="mb-4 text-amber-500 text-4xl md:text-5xl">Welcome to KhenzhoPips EA™ Academy</h1>
            <p className="text-lg font-semibold text-primary mb-6">Hedged & Authed | Smart Automated Trading System</p>
            <blockquote className="max-w-2xl mx-auto">
              <p className="text-xl italic text-muted-foreground mb-4">
                “We don’t just teach trading — we teach structure, logic, and control.”
              </p>
              <p className="font-semibold text-primary">— Khenzho</p>
            </blockquote>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mt-8">
              This is your central hub for mastering the art and science of automated trading. Let's begin.
            </p>
          </div>
        </section>

        {/* Part 1: Beginners */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-emerald-500 text-3xl md:text-4xl">⚙️ PART 1 — For Beginners: Building a Strong Foundation</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                This foundational course is designed for new traders. Our goal is to demystify algorithmic trading, 
                build your confidence, and equip you with the core knowledge needed to operate the KhenzhoPips EA safely and effectively.
              </p>
            </div>

            <div className="space-y-8">
              {beginnerModules.map((module) => (
                <Card key={module.title} className="p-8 gradient-card border-primary/20">
                  <h3 className="text-2xl mb-4 text-foreground">{module.emoji} Module {module.title}</h3>
                  <p className="text-primary font-semibold mb-4">🎯 Objective: {module.objective}</p>
                  {module.explanation && <p className="text-muted-foreground mb-6">🔍 Explanation: {module.explanation}</p>}
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">📚 Topics Covered:</h4>
                    <ul className="space-y-3">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          <strong className="text-foreground">{topic.name}:</strong> {topic.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="italic"><strong className="text-primary">💡 Key Insight:</strong> {module.keyInsight}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Part 2: Intermediate */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-emerald-500 text-3xl md:text-4xl">⚡ PART 2 — For Intermediate Traders: Enhancing Your Edge</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                You've mastered the basics. This next-level course is about optimization, strategic implementation, 
                and using the EA to enhance your own trading intelligence.
              </p>
            </div>

            <div className="space-y-6">
              {intermediateModules.map((module) => (
                <Card key={module.title} className="p-8 gradient-card border-primary/20">
                  <h3 className="text-2xl mb-4 text-foreground">{module.emoji} Module {module.title}</h3>
                  <p className="text-primary font-semibold mb-4">🎯 Objective: {module.objective}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">📚 Topics Covered:</h4>
                    <ul className="space-y-3">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          <strong className="text-foreground">{topic.name}:</strong> {topic.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="italic"><strong className="text-primary">💡 Key Insight:</strong> {module.keyInsight}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final Lessons */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-emerald-500 text-3xl md:text-4xl">🎓 Final Lessons — The Khenzho Philosophy</h2>
            <p className="text-muted-foreground mb-6">We live in an era of influencers, fake mentors, and prop firms that prey on ambition. Most traders lose not because they lack intelligence — but because they lack structure.</p>
            <p className="text-muted-foreground mb-8">At KhenzhoPips EA Academy, we stand for:</p>
            <ul className="space-y-2 mb-8 text-lg">
              <li><strong className="text-primary">Transparency</strong> — No secrets, no magic setups.</li>
              <li><strong className="text-primary">Structure</strong> — Logic, probability, and risk come first.</li>
              <li><strong className="text-primary">Simplicity</strong> — Remove noise; master repetition.</li>
              <li><strong className="text-primary">Education</strong> — Tools are powerful only in trained hands.</li>
            </ul>
            <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-card/50 rounded-r-lg text-left">
              <p className="text-lg italic mb-4">“All strategies work — but not all the time. The goal isn’t to find perfection; it’s to find predictability.”</p>
              <p className="text-primary font-semibold">— Khenzho</p>
            </blockquote>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;