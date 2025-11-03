import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="py-16 px-4 gradient-hero">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <AlertTriangle className="w-12 h-12 text-primary" />
              <h1 className="text-amber-500 text-4xl md:text-5xl">Risk Disclaimer & Terms of Use</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Please read this document carefully before using our products or services.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl space-y-8">
            {/* High-Risk Investment Notice */}
            <Card className="p-8 gradient-card border-destructive/50">
              <h2 className="text-3xl md:text-4xl mb-4 text-destructive">High-Risk Investment Notice</h2>
              <p className="text-muted-foreground mb-4">
                Trading foreign exchange, contracts for difference (CFDs), cryptocurrencies, and other leveraged financial 
                instruments carries an <strong className="text-foreground">extremely high level of risk</strong> and may not be suitable for all investors.
              </p>
              <p className="text-muted-foreground mb-4">
                The possibility exists that you could sustain a loss of some or all of your initial investment. 
                Therefore, you should not invest money that you cannot afford to lose.
              </p>
              <p className="text-muted-foreground">
                The high degree of leverage can work against you as well as for you. Before deciding to trade, 
                you should carefully consider your investment objectives, level of experience, and risk appetite.
              </p>
            </Card>

            {/* System-Specific Limitations */}
            <Card className="p-8 gradient-card border-primary/20">
              <h2 className="text-3xl md:text-4xl mb-4 text-emerald-500">System-Specific Limitations & Weaknesses</h2>
              <p className="text-muted-foreground mb-6">
                KhenzhoPips EAs are trading tools, not investment advice. Past performance, whether actual or indicated by 
                historical tests, is not a guarantee of future results. All trading systems, including ours, have inherent 
                weaknesses and will experience periods of drawdown.
              </p>
              
              <div className="space-y-4">
                <div className="bg-background/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-foreground">Scout EA (Range Trading)</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimized for ranging markets. May underperform during strong trending moves. Requires proper range identification.
                  </p>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-foreground">Navigator EA (Hybrid)</h3>
                  <p className="text-sm text-muted-foreground">
                    Cannot predict market state changes with 100% accuracy. May experience whipsaws during transition periods.
                  </p>
                </div>
                
                <div className="bg-background/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-foreground">Sentinel EA (AI Volatility)</h3>
                  <p className="text-sm text-muted-foreground">
                    Susceptible to "black swan" events and market conditions outside its training data. Requires higher risk tolerance.
                  </p>
                </div>
              </div>
            </Card>

            {/* User Responsibility */}
            <Card className="p-8 gradient-card border-primary/20">
              <h2 className="text-3xl md:text-4xl mb-4 text-emerald-500">User Responsibility & Understanding</h2>
              <p className="text-muted-foreground mb-6">
                It is your <strong className="text-foreground">absolute responsibility</strong> to understand how each EA works 
                before deploying it on a live account.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Thoroughly study</strong> the educational materials provided in our academy
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Run the EA</strong> on a demo account first before risking real capital
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Select appropriate</strong> risk settings based on your account size and risk tolerance
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Continuously monitor</strong> system performance and market conditions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Never invest</strong> more than you can afford to lose
                  </p>
                </div>
              </div>
            </Card>

            {/* Final Disclaimer */}
            <Card className="p-8 gradient-card border-destructive/50">
              <h2 className="text-3xl md:text-4xl mb-4 text-destructive">Final Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                By using our software, you acknowledge and agree that you are <strong className="text-foreground">solely responsible</strong> for 
                all trading decisions and their outcomes.
              </p>
              <p className="text-muted-foreground">
                The creator of KhenzhoPips EA assumes <strong className="text-foreground">no responsibility</strong> for user profits or losses. 
                Trading results will vary depending on market conditions, user settings, broker execution quality, and countless other factors 
                beyond our control.
              </p>
            </Card>

            {/* Additional Legal */}
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>For questions regarding this disclaimer, please contact us through our support channels.</p>
              <p>Last updated: November 2, 2025</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
