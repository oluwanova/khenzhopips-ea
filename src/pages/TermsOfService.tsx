import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-4xl py-24 px-4">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: November 5, 2025</p>

        <div className="space-y-6">
          <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the https://khenzhopipsea-v2.web.app website (the "Service") and any Expert Advisor ("EA", "Software") operated by KhenzhoPips ("us", "we", or "our").</p>

          <h2 className="text-2xl font-semibold pt-4">1. Agreement to Terms</h2>
          <p>By accessing our Service, purchasing, downloading, or using our Software, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service or use the Software.</p>

          <h2 className="text-2xl font-semibold pt-4">2. Performance Transparency and Verification</h2>
          <p>We are committed to the highest degree of transparency regarding the performance of our Software. Before purchasing, all prospective customers are invited and encouraged to independently verify our performance claims through the following methods, which are designed to be immutable and cannot be manipulated by us:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Live Performance Streams:</strong> We will conduct periodic live-streamed performance reviews on our official social media platforms, demonstrating the Software's operation in real-time.</li>
            <li><strong>Investor Access:</strong> View-only login credentials for our MetaTrader 5 (MT5) trading accounts will be made available on our website. This allows interested parties to directly log in and independently review the complete, unaltered trading history and performance.</li>
            <li><strong>Third-Party Verification:</strong> All trading account performance is tracked and publicly available via verified MyFxBook profiles.</li>
            <li><strong>Performance Reports:</strong> Detailed performance reports will be regularly published for public review.</li>
          </ul>
          <p>By providing these verification methods, we offer proof of performance, not a promise of future results. You, the user, are responsible for evaluating this data and making an informed purchasing decision. All updates to the software or its performance will be communicated transparently.</p>
          
          <h2 className="text-2xl font-semibold pt-4">3. HIGH-RISK INVESTMENT WARNING</h2>
          <p className="font-bold">Trading foreign exchange, cryptocurrencies, and other financial instruments on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. Our Software is a tool for executing trades and does not constitute financial advice. We are a technology provider only. All trading decisions are your own, and you are solely responsible for the outcomes. Past performance of the Software is not indicative of future results.</p>

          <h2 className="text-2xl font-semibold pt-4">4. License Grant and Restrictions</h2>
          <p>Upon successful purchase, we grant you a limited, non-exclusive, non-transferable license to use the Software as determined by your license. You do not own the Software; you are licensing the right to use it. You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
              <li>Decompile, reverse-engineer, disassemble, or otherwise attempt to derive the source code for the Software.</li>
              <li>Sell, rent, lease, redistribute, or sublicense the Software or your license key to any third party.</li>
              <li>Use the Software for any unlawful purpose or in violation of any international, federal, or local laws.</li>
              <li>Remove or alter any copyright, trademark, or other proprietary notices on the Software.</li>
            </ul>

          <h2 className="text-2xl font-semibold pt-4">5. Limitation of Liability</h2>
          <p>The Software is provided on an "as is" and "as available" basis. To the fullest extent permissible by law, in no event shall KhenzhoPips, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service or Software; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>

          <h2 className="text-2xl font-semibold pt-4">6. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.</p>
          
          <h2 className="text-2xl font-semibold pt-4">7. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us via the contact form on our website.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}