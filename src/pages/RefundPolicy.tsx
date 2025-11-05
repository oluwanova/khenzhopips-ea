import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-4xl py-24 px-4">
        <h1 className="text-4xl font-bold mb-6">Refund Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: November 5, 2025</p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold pt-4">1. General Policy</h2>
          <p className="font-bold text-lg">
            Due to the nature of our products being irrevocable, instantly delivered digital goods, we maintain a strict no-refund policy. All sales are considered final and non-refundable once the purchase is completed and the software license key has been delivered.
          </p>
          
          <h2 className="text-2xl font-semibold pt-4">2. Rationale and Pre-Purchase Due Diligence</h2>
          <p>
            This policy is in place to protect our intellectual property. Unlike physical goods, digital software cannot be returned. To ensure customer satisfaction and informed purchasing decisions, we provide multiple transparent and immutable methods for prospective customers to verify the performance of our software *before* purchase, as outlined in our Terms of Service. These methods include, but are not limited to, verified MyFxBook profiles and view-only investor access to our live MT5 accounts.
          </p>
          <p>
            We strongly urge all potential buyers to utilize these resources to conduct their own thorough due diligence. By proceeding with a purchase, the customer acknowledges that they have been provided ample opportunity to evaluate the product's historical performance.
          </p>

          <h2 className="text-2xl font-semibold pt-4">3. Performance Disclaimer</h2>
          <p>
            As stated in our Terms of Service, trading involves substantial risk, and past performance is not indicative of future results. We do not guarantee profits or any specific financial outcomes from the use of our software. Therefore, dissatisfaction with the trading performance of the Expert Advisor does not constitute grounds for a refund.
          </p>
          
          <h2 className="text-2xl font-semibold pt-4">4. Exceptional Circumstances</h2>
          <p>
            In the rare and exceptional event that a customer experiences a persistent, verifiable technical issue that prevents the software from functioning as described on a compatible system, and our technical support team is unable to resolve the issue within a reasonable timeframe, a refund or store credit may be considered on a case-by-case basis at our sole discretion.
          </p>
          
          <h2 className="text-2xl font-semibold pt-4">5. Agreement</h2>
          <p>
            By completing a purchase, you are acknowledging that you have read, understood, and agree to be bound by the terms of this Refund Policy.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}