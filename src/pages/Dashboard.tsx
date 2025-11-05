import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db, functions } from "@/lib/firebaseClient";
import { signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy } from "lucide-react";

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
  
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [gumroadKey, setGumroadKey] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLinking, setIsLinking] = useState(false);
  
  const availableProducts = [
      { id: "scout_v1", name: "Scout EA v1.0" },
      { id: "navigator_v2", name: "Navigator EA v2.0" },
      { id: "sentinel_v3", name: "Sentinel EA v3.0" },
      { id: "guardian_v4", name: "Tactical Guardian v4.0" },
  ];

  const fetchLicenses = async () => {
    if (user) {
      setLoading(true);
      try {
        const licensesRef = collection(db, "licenses");
        const q = query(licensesRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userLicenses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as License));
        setLicenses(userLicenses.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
      } catch (error) {
        toast({ title: "Error", description: "Could not fetch your licenses.", variant: "destructive" });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user) fetchLicenses();
  }, [user, toast]);

  const handleLinkLicense = async () => {
    if (!gumroadKey || !selectedProduct) {
      toast({ title: "Missing Information", description: "Please select a product and enter your Gumroad license key.", variant: "destructive" });
      return;
    }
    setIsLinking(true);
    try {
      const linkFn = httpsCallable(functions, 'linkGumroadLicense');
      const selectedProdData = availableProducts.find(p => p.id === selectedProduct);
      await linkFn({ licenseKey: gumroadKey, productId: selectedProduct, productName: selectedProdData?.name });
      toast({ title: "Success!", description: "Your Gumroad license has been linked to your account." });
      setGumroadKey("");
      setSelectedProduct("");
      fetchLicenses();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setIsLinking(false);
  };
  
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>My Dashboard</CardTitle>
            <CardDescription>Welcome, {user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardHeader><CardTitle>My Products & Licenses</CardTitle></CardHeader>
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
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyToClipboard(license.licenseKey)}><Copy className="h-4 w-4" /></Button>
                          </div>
                        </div>
                        <Button className="w-full sm:w-auto mt-2 sm:mt-0"><Download className="mr-2 h-4 w-4" />Download EA</Button>
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
                <CardTitle>Activate an External License</CardTitle>
                <CardDescription>Purchased on Gumroad? Enter the license key from your receipt to link it to your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select onValueChange={setSelectedProduct} value={selectedProduct}>
                  <SelectTrigger><SelectValue placeholder="Select the product you purchased..." /></SelectTrigger>
                  <SelectContent>
                    {availableProducts.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="Paste your Gumroad license key here" value={gumroadKey} onChange={(e) => setGumroadKey(e.target.value)} />
                <Button className="w-full" onClick={handleLinkLicense} disabled={isLinking}>{isLinking ? "Linking..." : "Link My License"}</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Account Actions</CardTitle></CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
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