import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PleaseVerify = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Check Your Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We've sent a verification link to your email address. Please click the link to activate your account.</p>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default PleaseVerify;