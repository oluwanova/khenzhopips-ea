import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        setIsAdmin(tokenResult.claims.admin === true);
      }
      setIsCheckingAdmin(false);
    };
    checkAdminStatus();
  }, [user]);

  if (loading || isCheckingAdmin) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />; // Or to a specific "unauthorized" page
  }

  return <Outlet />; // Render child component (Admin Dashboard)
};

export default AdminRoute;