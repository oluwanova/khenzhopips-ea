import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebaseClient";
import { signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy } from "lucide-react";

// [NEW] Define the structure of a License object
interface License {
  id: string;
  productId: string;
  productName: string;
  licenseKey: string;
  createdAt: Timestamp;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // [NEW] State for loading and storing licenses
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  // --- [NEW] Function to fetch licenses from Firestore ---
  useEffect(() => {
    const fetchLicenses = async () => {
      if (user) {
        try {
          // Query the 'licenses' collection for documents matching the user's UID
          const licensesRef = collection(db, "licenses");
          const q = query(licensesRef, where("userId", "==", user.uid));
          
          const querySnapshot = await getDocs(q);
          const userLicenses: License[] = [];
          querySnapshot.forEach((doc) => {
            userLicenses.push({ id: doc.id, ...doc.data() } as License);
          });
          
          setLicenses(userLicenses);

        } catch (error) {
          console.error("Error fetching licenses:", error);
          toast({ title: "Error", description: "Could not fetch your product licenses.", variant: "destructive" });
        }
      }
      setLoading(false);
    };

    fetchLicenses();
  }, [user, toast]);

  const handleCopyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: "Copied!", description: "License key copied to clipboard." });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
    } catch (error) {
      toast({ title: "Logout Error", description: "Failed to log out.", variant: "destructive" });
    }
  };

  const handlePasswordReset = async () => {
    if (user?.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        toast({ title: "Password Reset Email Sent", description: "Check your inbox for instructions." });
      } catch (error) {
        toast({ title: "Error", description: "Failed to send password reset email.", variant: "destructive" });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <p>Loading Dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>My Dashboard</CardTitle>
            <CardDescription>Welcome, {user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* [UPDATED] My Products & Licenses Card */}
            <Card>
              <CardHeader>
                <CardTitle>My Products & Licenses</CardTitle>
              </CardHeader>
              <CardContent>
                {licenses.length > 0 ? (
                  <ul className="space-y-4">
                    {licenses.map((license) => (
                      <li key={license.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{license.productName}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-muted-foreground">License Key:</span>
                            <code className="font-mono text-xs bg-muted p-1 rounded">{license.licenseKey}</code>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyToClipboard(license.licenseKey)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button className="w-full sm:w-auto mt-2 sm:mt-0">
                          <Download className="mr-2 h-4 w-4" />
                          Download EA
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center p-6 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">You have not purchased any products yet.</p>
                    <Button onClick={() => navigate("/products")}>Browse Products</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader><CardTitle>Account Actions</CardTitle></CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={handlePasswordReset}>Reset Password</Button>
                <Button variant="destructive" onClick={handleLogout}>Logout</Button>
              </CardContent>
            </Card>
            
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;