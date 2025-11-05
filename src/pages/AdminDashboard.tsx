import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { functions } from "@/lib/firebaseClient";
import { httpsCallable } from "firebase/functions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppUser {
  uid: string;
  email: string | undefined;
  creationTime: string;
  lastSignInTime: string;
  isAdmin: boolean;
  isDisabled: boolean;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- [NEW] State for the Mint License form ---
  const [mintUid, setMintUid] = useState("");
  const [mintProductId, setMintProductId] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  
  const availableProducts = [
      { id: "scout_v1", name: "Scout EA v1.0" },
      { id: "navigator_v2", name: "Navigator EA v2.0" },
      { id: "sentinel_v3", name: "Sentinel EA v3.0" },
      { id: "guardian_v4", name: "Tactical Guardian v4.0" },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const getAllUsersFn = httpsCallable(functions, 'getAllUsers');
      const result = await getAllUsersFn();
      const data = result.data as { users?: AppUser[] };
      if (data && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setError("Could not retrieve user data in the expected format.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const addAdminRoleFn = httpsCallable(functions, 'addAdminRole');
      await addAdminRoleFn({ email: adminEmail });
      toast({ title: "Success", description: `${adminEmail} is now an admin.` });
      setAdminEmail("");
      fetchUsers();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const handleToggleDisable = async (uid: string, currentStatus: boolean) => {
    try {
      const setUserDisabledStatusFn = httpsCallable(functions, 'setUserDisabledStatus');
      await setUserDisabledStatusFn({ uid, disabled: !currentStatus });
      toast({ title: "Success", description: `User status updated.` });
      fetchUsers();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (window.confirm("Are you sure you want to PERMANENTLY delete this user and all their licenses? This cannot be undone.")) {
      try {
        const deleteUserFn = httpsCallable(functions, 'deleteUser');
        await deleteUserFn({ uid });
        toast({ title: "Success", description: "User has been deleted." });
        fetchUsers();
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    }
  };
  
  // --- [NEW] Function to mint a license for a user ---
  const handleMintLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mintUid || !mintProductId) {
      toast({ title: "Missing Information", description: "Please provide a User ID and select a product.", variant: "destructive"});
      return;
    }
    setIsMinting(true);
    try {
      const adminMintLicenseFn = httpsCallable(functions, 'adminMintLicense');
      const selectedProd = availableProducts.find(p => p.id === mintProductId);
      await adminMintLicenseFn({
        uid: mintUid,
        productId: mintProductId,
        productName: selectedProd?.name
      });
      toast({ title: "Success!", description: `Lifetime license for ${selectedProd?.name} created for user ${mintUid}`});
      setMintUid("");
      setMintProductId("");
    } catch (err: any) {
      toast({ title: "Minting Failed", description: err.message, variant: "destructive" });
    }
    setIsMinting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 pt-24 space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Grant Admin Privileges</CardTitle>
              <CardDescription>Enter the email of a user to make them an admin.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMakeAdmin} className="flex items-center gap-4">
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Granting..." : "Make Admin"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* --- [NEW] Mint License Card --- */}
          <Card>
            <CardHeader>
              <CardTitle>Mint a Free License</CardTitle>
              <CardDescription>Manually generate a lifetime license for a user. (For testing or special grants)</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMintLicense} className="space-y-4">
                <Input
                  placeholder="Paste User ID (UID) here"
                  value={mintUid}
                  onChange={(e) => setMintUid(e.target.value)}
                  required
                />
                <Select onValueChange={setMintProductId} value={mintProductId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product to grant..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" disabled={isMinting} className="w-full">
                  {isMinting ? "Minting..." : "Generate Lifetime License"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p>Loading users...</p>}
            {error && <p className="text-destructive">Error: {error}</p>}
            {!loading && !error && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>User ID (UID)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.uid}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        {user.isDisabled ? <Badge variant="destructive">Disabled</Badge> : <Badge variant="secondary">Active</Badge>}
                      </TableCell>
                      <TableCell>{user.isAdmin && <Badge>Admin</Badge>}</TableCell>
                      <TableCell>
                        <code className="text-xs">{user.uid}</code>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">Actions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleToggleDisable(user.uid, user.isDisabled)}>
                              {user.isDisabled ? 'Enable User' : 'Disable User'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.uid)}>
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;