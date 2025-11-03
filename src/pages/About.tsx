import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import founderPhoto from "@/Showball Psalmuel Pro.png";

const About = () => {
  const fivePillars = [
    {
      title: "Radical Simplicity",
      subtitle: "Trade any market, any style, without the complexity.",
      description: "Our systems are engineered to be universally adaptable and intuitive. We aim for a reality where every trader can operate with confidence, anytime, on any pair. The goal is ultimate flexibility, allowing you to execute your preferred style—whether you are a scalper, a day trader, or a swing trader—without needing a decade of experience to manage the tool."
    },
    {
      title: "Engineered Discipline",
      subtitle: "We automate discipline to conquer trading's greatest challenge: human psychology.",
      description: "By automating a pre-set strategy, our EAs act as a circuit breaker for destructive emotions. This systematic approach removes greed, eliminates fear-based hesitation, prevents over-trading, and even protects you from under-trading. Your strategy is executed with the cold, unwavering logic of a machine."
    },
    {
      title: "Autonomous Efficiency",
      subtitle: "Reclaim your time while our systems work the markets for you, 24/7.",
      description: "Manual trading chains you to the charts. Our systems are designed to deliver exceptional time management by setting you free. They operate with tireless 24/7 efficiency, scanning for opportunities, executing entries, and managing trades across all market sessions, so you can focus on your life."
    },
    {
      title: "A Statistically Verified Edge",
      subtitle: "Our strategies are not based on opinion; they are forged from data.",
      description: "Every system is the product of a rigorous, scientific process. Before an EA ever reaches you, it has endured thousands of hours of back-testing and, more importantly, live forward-testing to validate its statistical edge in real-world conditions. We trade probabilities, not predictions."
    },
    {
      title: "Non-Negotiable Risk Protocol",
      subtitle: "A powerful engine is useless without superior brakes.",
      description: "A profitable strategy can instantly fail without disciplined risk and money management. Our systems are powerful tools, but they are not a license to be reckless. We provide the advanced controls and education needed to define your risk, protect your capital, and grow sustainably. You must always remain the chief risk manager."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="mb-6 text-amber-500 text-4xl md:text-5xl">The Pursuit of True Edge: My Journey Through Fire</h1>
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
                  <img src={founderPhoto} alt="Khenzho (Psalmuel)" className="w-32 h-32 rounded-full object-cover shadow-glow" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="mb-2 text-emerald-500 text-3xl md:text-4xl">Khenzho (Psalmuel)</h2>
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

        {/* The Khenzho Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-center mb-12 text-emerald-500 text-3xl md:text-4xl">KHENZHO PIPS: FROM ILLUSION TO ENGINEERING THE EDGE</h2>
            <div className="space-y-12">
              <Card className="p-8 md:p-12 gradient-card">
                <h3 className="text-2xl mb-4 text-foreground">I. The Beginning in the Noise (University Days – 2012)</h3>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>I entered this industry the same way many of us did — full of hope, hungry for freedom, and completely unprepared for the brutality of financial markets.</p>
                  <p>I was barely twenty, in university, trying to make sense of life, money, and purpose. Everywhere I turned, people were talking about forex. The dorms buzzed with hype — stories of students turning $50 into $5,000 overnight.</p>
                  <p>I watched influencers flaunt rented cars and fabricated profits, selling “courses” for hundreds of dollars. It was impossible to ignore. The fear of missing out was everywhere — and I fell for it, hard.</p>
                  <p>I spent my tuition fees chasing signals, mentorships, and secret indicators. I lost everything — not once, but three times. Each loss was a lesson paid in full with money I couldn’t afford to lose.</p>
                  <p>The irony? Those who promised “financial freedom” were the ones taking freedom away — selling dreams that never delivered.</p>
                </div>
              </Card>

              <Card className="p-8 md:p-12 gradient-card">
                <h3 className="text-2xl mb-4 text-foreground">II. The Industry of Illusions</h3>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>The truth is — the trading industry isn’t built to make traders rich. It’s built to feed on their hope.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Brokers manipulate spreads, delay executions, and quietly profit when traders lose.</li>
                    <li>Prop firms promise “funding” but enforce rules designed for failure.</li>
                    <li>Influencers sell indicators, mentorships, and signals — all repackaged versions of the same recycled ideas.</li>
                    <li>Scammers disguise themselves as “account managers” or “automated systems,” stealing deposits in the name of “guaranteed profit.”</li>
                  </ul>
                  <p>And yet… it’s not all their fault. Most traders walk into this jungle without a map. No understanding of leverage, risk, liquidity, or their own psychology. They chase magic instead of mastering process.</p>
                </div>
              </Card>

              <Card className="p-8 md:p-12 gradient-card">
                <h3 className="text-2xl mb-4 text-foreground">III. The Turning Point: When the Analysis Became the Cage</h3>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>At one point, I studied everything — ICT, Wyckoff, fundamentals, technicals, Fibonacci, order blocks, smart money concepts. I filled notebooks with theories and market structures, convinced that mastery of analysis would equal mastery of markets.</p>
                  <p>But instead of clarity, I found paralysis. Each new concept created more doubt. Each guru had a “rule” that contradicted another. When the trades failed, they always had an excuse: “You didn’t take the right setup.” “You were impatient.” “You didn’t follow the model.”</p>
                  <p>They were never wrong — and you were never right. That’s when I realized — these systems are designed to give their creators plausible deniability. They can never fail — only you can.</p>
                  <p>So I stopped chasing perfection. I stopped worshiping analysis. I stopped treating trading like art, and started treating it like engineering.</p>
                </div>
              </Card>

              <Card className="p-8 md:p-12 gradient-card">
                <h3 className="text-2xl mb-4 text-foreground">IV. The Market Is a Machine</h3>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>The turning point came when I realized that my biggest enemy wasn’t the market — it was myself. My emotions. My biases. My need to be right. So I decided to remove myself from the equation entirely.</p>
                  <blockquote className="border-l-4 border-primary pl-6 py-4 my-6 bg-background/50 rounded-r-lg">
                    <p className="text-lg italic mb-4">“The market is a machine. My goal was to teach my EA to think like an engineer, not a gambler. It doesn’t get scared, it doesn’t get greedy — it simply executes its statistical edge.”</p>
                    <p className="text-primary font-semibold">— Khenzho</p>
                  </blockquote>
                  <p>I began to view markets through mathematics, probability, and structure — not emotion. Every trade became a hypothesis. Every loss, a data point. Every win, a validation of logic.</p>
                </div>
              </Card>

              <Card className="p-8 md:p-12 gradient-card">
                <h3 className="text-2xl mb-4 text-foreground">V. Five Years of Building the KhenzhoPips EA</h3>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>I spent the next five years building, testing, failing, and rebuilding. Each version of KhenzhoPips EA represents thousands of hours of code, backtests, and forward simulations.</p>
                  <p>It wasn’t about chasing profits anymore — it was about building a machine that could outlast my emotions. Every bug fixed was a behavioral flaw in my old self. Every line of code written was a line of discipline learned.</p>
                  <p>And through it all, I discovered something profound: All strategies work — but not all the time. The edge is not in the tool, but in the structure and discipline behind it.</p>
                </div>
              </Card>

              <Card className="p-8 md:p-12 gradient-card">
                <h3 className="text-2xl mb-4 text-foreground">VI. Why I Stopped Over-Analyzing (and What I Learned)</h3>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>I no longer do “analysis” to predict. I analyze only to understand what others might be seeing — to know where liquidity lies, where bias clusters, and where traps are set.</p>
                  <p>RSI, Fibonacci, Bollinger Bands, ICT — they’re not wrong. They’re just incomplete. They tell you what others might do, not what will happen.</p>
                  <p>The problem is not the tools. It’s how they’re sold as certainty. The truth? All strategies work — about half the time. What matters is not perfection, but consistency — a repeatable structure with measurable probability.</p>
                </div>
              </Card>

              <Card className="p-8 md:p-12 gradient-card">
                <h3 className="text-2xl mb-4 text-foreground">VII. How I Became Different</h3>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>While others chase complexity, I chase clarity. My philosophy is simple:</p>
                  <blockquote className="border-l-4 border-primary pl-6 py-4 my-6 bg-background/50 rounded-r-lg">
                    <p className="text-lg italic">“The best strategy is the one that removes pressure — The one that executes predictably, repetitively, and without emotional weight.”</p>
                  </blockquote>
                  <p>No gaslighting. No mystical setups. No guru excuses. Just structure, logic, and statistical execution. That’s why I built the KhenzhoPips EA — not as a magic formula, but as a disciplined framework for data-driven trading.</p>
                </div>
              </Card>

              <Card className="p-8 md:p-12 gradient-card">
                <h3 className="text-2xl mb-4 text-foreground">VIII. The Future: Restoring Trust in Trading</h3>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>Today’s markets are polluted — by fake mentors, greedy firms, and traders who’ve lost faith. But I believe trading can be reclaimed — with transparency, structure, and truth.</p>
                  <p>Because when trading becomes about math, logic, and process, you stop gambling and start engineering outcomes. You stop chasing money — and start mastering probability.</p>
                  <p>That’s the mission behind my work, my EA, and my message:</p>
                  <blockquote className="border-l-4 border-primary pl-6 py-4 my-6 bg-background/50 rounded-r-lg">
                    <p className="text-lg italic">“Trading isn’t about predicting the future — It’s about building a system that survives it.”</p>
                    <p className="text-primary font-semibold">— Khenzho Pips</p>
                  </blockquote>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-emerald-500 text-3xl md:text-4xl">The 5 Pillars of Algorithmic Edge</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                At KhenzhoPips, our entire philosophy is engineered around one central mission: to simplify the complex world of trading through robust, data-driven systems. We believe that a true, sustainable edge isn't found in secret indicators or stressful chart-watching, but in a disciplined, logical approach that anyone can follow. These Five Pillars are the foundation of every system we build and every trader we empower.
              </p>
            </div>
            <div className="space-y-8">
              {fivePillars.map((pillar, idx) => (
                <Card key={idx} className="p-8 gradient-card border-primary/20">
                  <h3 className="text-2xl mb-2 text-foreground">Pillar {idx + 1}: {pillar.title}</h3>
                  <p className="text-lg text-primary font-semibold mb-4">{pillar.subtitle}</p>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </Card>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-12">
              These five pillars are the unshakable foundation of Khenzho's Edge. They represent our commitment to transforming the chaotic art of trading into a disciplined, accessible, and efficient science.
            </p>
          </div>
        </section>

        {/* Promise */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 md:p-12 gradient-card border-primary/20 text-center">
              <h2 className="mb-6 text-emerald-500 text-3xl md:text-4xl">My Offer to You: I Don't Sell Hype or Fake Promises but Accountability and Structure.</h2>
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

        {/* Success Triangle */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-emerald-500 text-3xl md:text-4xl">The Success Triangle: The Partnership for Disciplined Trading</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Success in algorithmic trading isn't about buying a "magic black box." It's a partnership between the Architect, the Executor, and the Manager. Each role is critical, and when all three work in sync, the potential for consistent, emotion-free growth is unlocked. Here is the formula for how we succeed together.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* The Architect */}
              <Card className="p-8 gradient-card border-primary/20 flex flex-col">
                <h3 className="text-2xl mb-2 text-foreground">1. What I Do (The Architect)</h3>
                <p className="text-muted-foreground mb-6">My role is to build the engine. I operate in the world of data, statistics, and code to forge a tool that is robust, reliable, and statistically sound.</p>
                <ul className="space-y-3 text-sm flex-grow">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Research & Analyze:</strong> I spend thousands of hours studying market behavior and quantitative data to identify statistical patterns that have a verifiable edge.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Design & Build:</strong> I translate that research into clean, efficient code, building the EA's core logic and safety mechanisms from the ground up.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Test Relentlessly:</strong> Every strategy is subjected to rigorous back-testing and, more importantly, months of live forward-testing to ensure it performs as expected in real-world market conditions.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Refine & Improve:</strong> The markets evolve, and so do my systems. I continuously monitor performance and release updates to keep the EAs optimized for current market dynamics.</span></li>
                </ul>
                <p className="mt-6 text-sm italic text-primary">My promise is to provide you with a professionally engineered and thoroughly vetted trading tool.</p>
              </Card>

              {/* The Executor */}
              <Card className="p-8 gradient-card border-primary/20 flex flex-col">
                <h3 className="text-2xl mb-2 text-foreground">2. What The System Does (The Executor)</h3>
                <p className="text-muted-foreground mb-6">The EA is your tireless employee. Its only job is to execute the pre-defined strategy with perfect discipline, freeing you from the screen and from psychological stress.</p>
                <ul className="space-y-3 text-sm flex-grow">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Executes Flawlessly:</strong> The EA enters, manages, and exits trades based on pure logic. It never hesitates, never second-guesses, and never deviates from the plan.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Removes Emotion:</strong> The system is incapable of feeling greed, fear, or impatience. It acts as the ultimate circuit-breaker for the psychological errors that destroy most trading accounts.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Manages Your Time:</strong> The EA works 24/7, monitoring every market session so you don't have to. It allows you to step away from the charts and reclaim your life.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Enforces Consistency:</strong> By automating your strategy, the EA ensures that your trading edge is applied consistently over hundreds or thousands of trades, which is essential for long-term profitability.</span></li>
                </ul>
                <p className="mt-6 text-sm italic text-primary">The system's promise is to be the perfect, unemotional trading discipline you've always strived for.</p>
              </Card>

              {/* The Risk Manager */}
              <Card className="p-8 gradient-card border-primary/20 flex flex-col">
                <h3 className="text-2xl mb-2 text-foreground">3. What You Must Do (The Risk Manager)</h3>
                <p className="text-muted-foreground mb-6">This is your most important job. You are the CEO of your trading account. The EA is a powerful tool, but you are the one who directs its power and ensures its longevity.</p>
                <ul className="space-y-3 text-sm flex-grow">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Define Your Risk:</strong> You are responsible for setting the EA's parameters—like lot size and maximum drawdown—according to your personal risk tolerance and financial situation.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Learn the Tool:</strong> You must commit to understanding how the system works by studying our educational materials and running it on a demo account first.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Provide the Right Environment:</strong> You are responsible for ensuring the EA runs on a proper VPS (Virtual Private Server) with a low-latency connection to your broker.</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span><span><strong className="text-foreground">Maintain a Long-Term Perspective:</strong> You must evaluate the system's performance over months, not days. Trust the statistical process and do not emotionally interfere during normal drawdown periods.</span></li>
                </ul>
                <p className="mt-6 text-sm italic text-primary">Your promise to yourself must be to act as a disciplined supervisor, protecting your capital and allowing the system to do its job.</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;