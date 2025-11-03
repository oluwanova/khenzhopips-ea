import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // While the context is loading, show a loading indicator
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Authenticating...</div>
      </div>
    );
  }

  // If loading is finished and there is no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If loading is finished and there is a user, show the protected content
  return <Outlet />;
};

export default ProtectedRoute;