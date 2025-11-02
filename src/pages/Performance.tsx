import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Performance = () => {
  const systemPerformance = [
    {
      system: "Scout v1.0",
      focus: "Range Trading",
      pnl: "+42.7%",
      maxDD: "7.6%",
      profitFactor: "1.82",
      winRate: "68%",
      avgMonthly: "4-8%",
      bestInstrument: "EUR/USD"
    },
    {
      system: "Navigator v2.0",
      focus: "Hybrid Adaptive",
      pnl: "+58.3%",
      maxDD: "12.3%",
      profitFactor: "2.15",
      winRate: "62%",
      avgMonthly: "6-12%",
      bestInstrument: "Multiple Majors"
    },
    {
      system: "Sentience v3.0",
      focus: "AI Volatility",
      pnl: "+73.9%",
      maxDD: "18.5%",
      profitFactor: "2.45",
      winRate: "58%",
      avgMonthly: "8-15%",
      bestInstrument: "XAU/USD"
    }
  ];

  const liveAccounts = [
    {
      name: "Scout EA",
      accounts: [
        { id: "Account #1", login: "123456", password: "investor1" },
        { id: "Account #2", login: "123457", password: "investor2" },
        { id: "Account #3", login: "123458", password: "investor3" }
      ]
    },
    {
      name: "Navigator EA",
      accounts: [
        { id: "Account #7", login: "223456", password: "investor7" },
        { id: "Account #8", login: "223457", password: "investor8" },
        { id: "Account #9", login: "223458", password: "investor9" }
      ]
    },
    {
      name: "Sentience EA",
      accounts: [
        { id: "Account #13", login: "323456", password: "investor13" },
        { id: "Account #14", login: "323457", password: "investor14" },
        { id: "Account #15", login: "323458", password: "investor15" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="mb-6">Verified Performance: Our Commitment to Absolute Transparency</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Live, audited, and independently verified trading results across all KhenzhoPips systems. 
              No marketing gimmicks, just raw data.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 gradient-card border-primary/20">
              <h2 className="mb-4">Our Performance Philosophy</h2>
              <p className="text-muted-foreground text-lg">
                In an industry where backtested fantasies are sold as reality, we commit to radical transparency. 
                Every statistic here is from live forward-testing accounts, independently tracked by third-party services, 
                and accessible for your personal inspection 24/7.
              </p>
            </Card>
          </div>
        </section>

        {/* Comparative Performance */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-center mb-12">Comparative System Performance</h2>
            <div className="overflow-x-auto">
              <Card className="p-6 gradient-card">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4">System</th>
                      <th className="text-left py-4 px-4">Strategy Focus</th>
                      <th className="text-left py-4 px-4">6-Month P&L</th>
                      <th className="text-left py-4 px-4">Max DD</th>
                      <th className="text-left py-4 px-4">Profit Factor</th>
                      <th className="text-left py-4 px-4">Win Rate</th>
                      <th className="text-left py-4 px-4">Avg Monthly</th>
                      <th className="text-left py-4 px-4">Best Instrument</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemPerformance.map((system, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-background/50 transition-smooth">
                        <td className="py-4 px-4 font-semibold">{system.system}</td>
                        <td className="py-4 px-4 text-muted-foreground">{system.focus}</td>
                        <td className="py-4 px-4 text-success font-semibold">{system.pnl}</td>
                        <td className="py-4 px-4">{system.maxDD}</td>
                        <td className="py-4 px-4">{system.profitFactor}</td>
                        <td className="py-4 px-4">{system.winRate}</td>
                        <td className="py-4 px-4">{system.avgMonthly}</td>
                        <td className="py-4 px-4 text-muted-foreground">{system.bestInstrument}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </section>

        {/* Live Investor Access */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="mb-4">Live Investor Access</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Monitor our EAs in real-time using the investor passwords for our live MetaTrader 5 accounts.
              </p>
            </div>

            <div className="space-y-8">
              {liveAccounts.map((ea, idx) => (
                <Card key={idx} className="p-8 gradient-card border-primary/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl">{ea.name}</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        MyFXBook
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        FXBlue
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {ea.accounts.map((account, accountIdx) => (
                      <Card key={accountIdx} className="p-4 bg-background/50">
                        <div className="font-semibold mb-3">{account.id}</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Login:</span>
                            <code className="font-mono text-primary">{account.login}</code>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Password:</span>
                            <code className="font-mono text-primary">{account.password}</code>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              ))}

              {/* Guardian Coming Soon */}
              <Card className="p-8 gradient-card border-primary/20 opacity-50">
                <h3 className="text-2xl mb-4">Tactical Guardian</h3>
                <p className="text-muted-foreground text-center">Coming Soon...</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Performance;
