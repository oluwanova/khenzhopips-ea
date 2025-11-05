import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-4xl py-24 px-4">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: November 5, 2025</p>

        <div className="space-y-6">
          <p>KhenzhoPips ("us", "we", or "our") operates the https://khenzhopipsea-v2.web.app website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

          <h2 className="text-2xl font-semibold pt-4">1. Information Collection And Use</h2>
          <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
          <h3 className="text-xl font-semibold pt-2">Types of Data Collected</h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Personal Data:</strong> While using our Service, to create an account and purchase products, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This includes, but is not limited to, your email address.</li>
            <li><strong>Usage Data (EA):</strong> When you activate our Expert Advisor software, we collect a unique, anonymized session ID tied to your machine and license key. This data is used exclusively for the purpose of verifying your license and enforcing device limits as per your purchase agreement. We do not collect, transmit, or store any information about your trades, account balance, broker, or other personal trading activities.</li>
            <li><strong>Cookies:</strong> We use cookies to maintain your session when you are logged into our website. You can instruct your browser to refuse all cookies, but you may be unable to use some portions of our Service.</li>
          </ul>

          <h2 className="text-2xl font-semibold pt-4">2. Use of Data</h2>
          <p>KhenzhoPips uses the collected data for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>To provide and maintain the Service</li>
            <li>To manage your user account and software licenses</li>
            <li>To process your payments through our third-party payment processors</li>
            <li>To provide customer care and support</li>
            <li>To monitor the security of our Service and prevent fraud</li>
          </ul>
          
          <h2 className="text-2xl font-semibold pt-4">3. Data Processors and Third Parties</h2>
          <p>We do not sell, trade, or rent your Personal Data to others. We may use third-party companies and individuals to facilitate our Service ("Service Providers"). These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
           <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
            <li><strong>Firebase (Google Cloud):</strong> Our application infrastructure, database, and authentication are hosted on Google Cloud's Firebase platform.</li>
            <li><strong>Payment Processors (Paddle, Lemon Squeezy, etc.):</strong> Your payment information is processed securely by our third-party Merchant of Record. We do not have access to, nor do we store, your full credit card details on our servers.</li>
          </ul>

          <h2 className="text-2xl font-semibold pt-4">4. Security Of Data</h2>
          <p>The security of your data is important to us. We use commercially acceptable means to protect your Personal Data, such as encrypted connections (SSL) and secure cloud infrastructure. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
          
          <h2 className="text-2xl font-semibold pt-4">5. Your Data Protection Rights</h2>
          <p>You have the right to access, update, or delete the information we have on you. You can do this at any time by accessing your dashboard or contacting us for assistance.</p>

          <h2 className="text-2xl font-semibold pt-4">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}