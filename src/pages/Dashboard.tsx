import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Updated interface to include license type and expiration
interface License {
  id: string;
  productId: string;
  productName: string;
  licenseKey: string;
  createdAt: Timestamp;
  type: 'monthly' | 'lifetime'; // License type
  expiresAt?: Timestamp; // Optional expiration date for monthly licenses
  status: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to format the expiration date
  const formatExpiry = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    // Check if the subscription has expired
    if (date < new Date()) {
      return `Expired on ${date.toLocaleDateString()}`;
    }
    return `Renews on ${date.toLocaleDateString()}`;
  };

  useEffect(() => {
    const fetchLicenses = async () => {
      if (user) {
        setLoading(true);
        try {
          const licensesRef = collection(db, "licenses");
          const q = query(licensesRef, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const userLicenses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as License));
          // Sort licenses by creation date, newest first
          setLicenses(userLicenses.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
        } catch (error) {
          console.error("Failed to fetch licenses:", error);
          toast({ title: "Error", description: "Could not fetch your licenses.", variant: "destructive" });
        } finally {
          setLoading(false);
        }
      }
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
    } catch (error) {
      toast({ title: "Logout Error", description: "Failed to log out.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
<div className="min-h-screen flex flex-col">      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 pt-24 pb-12">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">My Dashboard</CardTitle>
            <CardDescription>Welcome back, {user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>My Products & Licenses</CardTitle>
                <CardDescription>View your active licenses and download your EAs here.</CardDescription>
              </CardHeader>
              <CardContent>
                {licenses.length > 0 ? (
                  <ul className="space-y-4">
                    {licenses.map((license) => (
                      <li key={license.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{license.productName}</h3>
                            <Badge variant={license.type === 'lifetime' ? 'default' : 'secondary'} className="capitalize">
                              {license.type === 'lifetime' ? <Star className="mr-2 h-4 w-4" /> : <Clock className="mr-2 h-4 w-4" />}
                              {license.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-muted-foreground">License Key:</span>
                            <code className="font-mono text-xs bg-muted p-1 rounded flex-grow truncate">{license.licenseKey}</code>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyToClipboard(license.licenseKey)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          {license.type === 'monthly' && (
                            <p className={`text-sm mt-2 ${license.status !== 'active' ? 'text-red-500' : 'text-muted-foreground'}`}>
                              {formatExpiry(license.expiresAt)}
                            </p>
                          )}
                        </div>
                        <Button className="w-full sm:w-auto mt-2 sm:mt-0">
                          <Download className="mr-2 h-4 w-4" />Download EA
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
            
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
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