import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebaseClient";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/"); // Go to homepage after logout
  };
  
  const handlePasswordReset = async () => {
    if (user?.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        toast({ title: "Password Reset Email Sent", description: "Please check your inbox." });
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>My Dashboard</CardTitle>
            <CardDescription>Welcome to your KhenzhoPips account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Account Details</h3>
              <p className="text-sm text-muted-foreground">Email: {user?.email}</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">My Subscriptions</h3>
              <p className="text-sm text-muted-foreground">You currently have no active subscriptions.</p>
              {/* This is where you would map over user's subscription data */}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handlePasswordReset} variant="outline" className="w-full">
                Reset Password
              </Button>
              <Button onClick={handleLogout} variant="destructive" className="w-full">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;