import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { functions, storage } from "@/lib/firebaseClient";
import { httpsCallable } from "firebase/functions";
import { ref, uploadBytesResumable } from "firebase/storage";
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
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Pencil } from "lucide-react";

interface AppUser {
  uid: string;
  email: string | undefined;
  creationTime: string;
  lastSignInTime: string;
  isAdmin: boolean;
  isDisabled: boolean;
}

interface License {
    id: string;
    userId: string;
    productName: string;
    licenseKey: string;
    status: 'active' | 'revoked' | 'expired';
    maxSessions: number;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [adminEmail, setAdminEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mintUid, setMintUid] = useState("");
  const [mintProductId, setMintProductId] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [mintMaxSessions, setMintMaxSessions] = useState("2");
  
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [editingLicenseId, setEditingLicenseId] = useState<string | null>(null);
  const [newMaxSessions, setNewMaxSessions] = useState("");
  
  const availableProducts = [
      { id: "scout", name: "Scout EA v1.0" },
      { id: "navigator", name: "Navigator EA v2.0" },
      { id: "sentinel", name: "Sentinel EA v3.0" },
      { id: "guardian", name: "Tactical Guardian v4.0" },
  ];

  const userEmailMap = useMemo(() => {
    return users.reduce((acc, user) => {
        if(user.email) {
            acc[user.uid] = user.email;
        }
        return acc;
    }, {} as Record<string, string>);
  }, [users]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const getAllUsersFn = httpsCallable(functions, 'getAllUsers');
      const getAllLicensesFn = httpsCallable(functions, 'admin_getAllLicenses');

      const [userResult, licenseResult] = await Promise.all([
        getAllUsersFn(),
        getAllLicensesFn(),
      ]);

      const userData = userResult.data as { users?: AppUser[] };
      if (userData && Array.isArray(userData.users)) {
        setUsers(userData.users);
      }

      const licenseData = licenseResult.data as { licenses?: License[] };
      if (licenseData && Array.isArray(licenseData.licenses)) {
        setLicenses(licenseData.licenses);
      }

    } catch (err: any) {
      toast({ title: "Error Fetching Data", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMakeAdmin = async (email: string) => {
    setIsSubmitting(true);
    try {
      const addAdminRoleFn = httpsCallable(functions, 'addAdminRole');
      await addAdminRoleFn({ email });
      toast({ title: "Success", description: `${email} is now an admin.` });
      setAdminEmail("");
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setIsSubmitting(false);
  };
  
  const handleRemoveAdmin = async (email: string) => {
    if (!email) return;
    if (window.confirm(`Are you sure you want to remove admin privileges from ${email}?`)) {
        try {
            const removeAdminRoleFn = httpsCallable(functions, 'removeAdminRole');
            await removeAdminRoleFn({ email });
            toast({ title: "Success", description: `${email} is no longer an admin.` });
            fetchData();
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        }
    }
  };

  const handleToggleDisable = async (uid: string, currentStatus: boolean) => {
    try {
      const setUserDisabledStatusFn = httpsCallable(functions, 'setUserDisabledStatus');
      await setUserDisabledStatusFn({ uid, disabled: !currentStatus });
      toast({ title: "Success", description: `User status updated.` });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (window.confirm("Are you sure? This will delete the user and all their licenses PERMANENTLY.")) {
      try {
        const deleteUserFn = httpsCallable(functions, 'deleteUser');
        await deleteUserFn({ uid });
        toast({ title: "Success", description: "User has been deleted." });
        fetchData();
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    }
  };
  
  const handleMintLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mintUid || !mintProductId) { return; }
    setIsMinting(true);
    try {
      const adminMintLicenseFn = httpsCallable(functions, 'adminMintLicense');
      const selectedProd = availableProducts.find(p => p.id === mintProductId);
      await adminMintLicenseFn({
        uid: mintUid,
        productId: mintProductId,
        productName: selectedProd?.name,
        maxSessions: parseInt(mintMaxSessions, 10),
      });
      toast({ title: "Success!", description: `License created!`});
      setMintUid(""); setMintProductId(""); setMintMaxSessions("2");
      fetchData();
    } catch (err: any) {
      toast({ title: "Minting Failed", description: err.message, variant: "destructive" });
    }
    setIsMinting(false);
  };

  const handleFileUpload = (productId: string, file: File) => {
    if (!file) return;
    if (!file.name.endsWith('.zip')) {
        toast({ title: "Invalid File Type", description: "Please upload a .zip file.", variant: "destructive"});
        return;
    }

    const storagePath = `products/${productId}.zip`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(productId);
    setUploadProgress(0);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, 
      (error) => {
        console.error("Upload failed:", error);
        toast({ title: "Upload Failed", description: error.message, variant: "destructive"});
        setUploading(null);
      }, 
      () => {
        toast({ title: "Upload Complete!", description: `${file.name} has been uploaded for ${productId}.`});
        setUploading(null);
      }
    );
  };
  
  const handleUpdateLicenseStatus = async (licenseId: string, newStatus: 'active' | 'revoked') => {
    try {
        const updateStatusFn = httpsCallable(functions, 'admin_updateLicenseStatus');
        await updateStatusFn({ licenseId, status: newStatus });
        toast({ title: "Success", description: `License has been ${newStatus}.`});
        fetchData();
    } catch (err: any) {
        toast({ title: "Update Failed", description: err.message, variant: "destructive"});
    }
  };

  const handleUpdateMaxSessions = async (licenseId: string) => {
    const sessionCount = parseInt(newMaxSessions, 10);
    if (isNaN(sessionCount) || sessionCount < 1) { return; }
    try {
        const updateSettingsFn = httpsCallable(functions, 'updateLicenseSettings');
        await updateSettingsFn({ licenseId, maxSessions: sessionCount });
        toast({ title: "Success", description: "Max sessions updated."});
        setEditingLicenseId(null);
        setNewMaxSessions("");
        fetchData();
    } catch (err: any) {
        toast({ title: "Update Failed", description: err.message, variant: "destructive"});
    }
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
              <form onSubmit={(e) => { e.preventDefault(); handleMakeAdmin(adminEmail); }} className="flex items-center gap-4">
                <Input type="email" placeholder="user@example.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Granting..." : "Make Admin"}</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mint a Free License</CardTitle>
              <CardDescription>Manually generate a lifetime license for a user.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMintLicense} className="space-y-4">
                <Input placeholder="Paste User ID (UID) here" value={mintUid} onChange={(e) => setMintUid(e.target.value)} required />
                <Select onValueChange={setMintProductId} value={mintProductId}>
                  <SelectTrigger><SelectValue placeholder="Select a product..." /></SelectTrigger>
                  <SelectContent>{availableProducts.map(p => (<SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>))}</SelectContent>
                </Select>
                <Input type="number" placeholder="Max Sessions (e.g., 2)" value={mintMaxSessions} onChange={(e) => setMintMaxSessions(e.target.value)} required />
                <Button type="submit" disabled={isMinting} className="w-full">{isMinting ? "Minting..." : "Generate License"}</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Product File Management</CardTitle>
                <CardDescription>Upload the .zip file for each product. This file should contain the EA and its README document.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Product</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {availableProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-semibold">{product.name}</TableCell>
                                <TableCell className="text-right">
                                    {uploading === product.id ? (
                                        <div className="flex items-center justify-end gap-4 w-48 ml-auto">
                                            <Progress value={uploadProgress} className="h-2" />
                                            <span className="text-sm">{Math.round(uploadProgress)}%</span>
                                        </div>
                                    ) : (
                                        <Button asChild variant="outline">
                                            <label htmlFor={`file-upload-${product.id}`}>
                                                Upload .zip
                                                <input id={`file-upload-${product.id}`} type="file" className="hidden" accept=".zip"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            handleFileUpload(product.id, e.target.files[0]);
                                                        }
                                                        e.target.value = '';
                                                    }} />
                                            </label>
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>License Management</CardTitle>
                <CardDescription>View, edit, and revoke all licenses in the system.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? <p>Loading licenses...</p> : (
                    <Table>
                        <TableHeader><TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Owned By (Email)</TableHead>
                            <TableHead>License Key</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Max Sessions</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow></TableHeader>
                        <TableBody>
                            {licenses.map((license) => (
                                <TableRow key={license.id}>
                                    <TableCell className="font-medium">{license.productName}</TableCell>
                                    <TableCell>{userEmailMap[license.userId] || "Unknown User"}</TableCell>
                                    <TableCell><code className="text-xs">{license.licenseKey}</code></TableCell>
                                    <TableCell>
                                        <Badge variant={license.status === 'active' ? 'default' : 'destructive'} className="capitalize">
                                            {license.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {editingLicenseId === license.id ? (
                                            <div className="flex items-center gap-2">
                                                <Input type="number" value={newMaxSessions} onChange={(e) => setNewMaxSessions(e.target.value)} className="h-8 w-20" />
                                                <Button size="sm" onClick={() => handleUpdateMaxSessions(license.id)}>Save</Button>
                                                <Button size="sm" variant="ghost" onClick={() => setEditingLicenseId(null)}>Cancel</Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                {license.maxSessions}
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => { setEditingLicenseId(license.id); setNewMaxSessions(String(license.maxSessions)); }}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {license.status === 'active' ? (
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleUpdateLicenseStatus(license.id, 'revoked')}>Revoke License</DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem onClick={() => handleUpdateLicenseStatus(license.id, 'active')}>Re-activate License</DropdownMenuItem>
                                                )}
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

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <p>Loading users...</p> : (
              <Table>
                <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead>Role</TableHead><TableHead>User ID (UID)</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.uid}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{user.isDisabled ? <Badge variant="destructive">Disabled</Badge> : <Badge variant="secondary">Active</Badge>}</TableCell>
                      <TableCell>{user.isAdmin && <Badge>Admin</Badge>}</TableCell>
                      <TableCell><code className="text-xs">{user.uid}</code></TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="sm">Actions</Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {user.isAdmin ? (
                                <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveAdmin(user.email!)}>
                                    Remove Admin
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => handleMakeAdmin(user.email!)}>
                                    Make Admin
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleDisable(user.uid, user.isDisabled)}>
                                {user.isDisabled ? 'Enable User' : 'Disable User'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.uid)}>Delete User</DropdownMenuItem>
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