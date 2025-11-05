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

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Correctly call 'getAllUsers'
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
      fetchUsers(); // Refresh list
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
      fetchUsers(); // Refresh list
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (window.confirm("Are you sure you want to PERMANENTLY delete this user? This cannot be undone.")) {
      try {
        const deleteUserFn = httpsCallable(functions, 'deleteUser');
        await deleteUserFn({ uid });
        toast({ title: "Success", description: "User has been deleted." });
        fetchUsers(); // Refresh list
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    }
  };
  
  const handleUpdateSubscription = async (uid: string, newStatus: string) => {
    try {
      const updateUserSubscriptionFn = httpsCallable(functions, 'updateUserSubscription');
      await updateUserSubscriptionFn({ uid, newStatus });
      toast({ title: "Success", description: `User subscription updated to ${newStatus}.`});
      // In a full app, we would also refresh the Firestore data here, but for now a toast is fine.
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 pt-24 space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <Card>
          <CardHeader>
            <CardTitle>Grant Admin Privileges</CardTitle>
            <CardDescription>Enter the email of an existing user to make them an admin.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleMakeAdmin} className="flex flex-col sm:flex-row items-center gap-4">
              <Input
                type="email"
                placeholder="user@example.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Granting..." : "Make Admin"}
              </Button>
            </form>
          </CardContent>
        </Card>

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
                    <TableHead>Last Sign-In</TableHead>
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
                      <TableCell>{new Date(user.lastSignInTime).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">...</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleToggleDisable(user.uid, user.isDisabled)}>
                              {user.isDisabled ? 'Enable User' : 'Disable User'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdateSubscription(user.uid, 'lifetime')}>
                              Set Subscription to Lifetime
                            </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => handleUpdateSubscription(user.uid, 'monthly')}>
                              Set Subscription to Monthly
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateSubscription(user.uid, 'free_trial')}>
                              Reset to Trial
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