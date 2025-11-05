import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// --- Page Imports ---
import Index from "./pages/Index";
import Products from "./pages/Products";
import Performance from "./pages/Performance";
import About from "./pages/About";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PleaseVerify from "./pages/PleaseVerify"; 

// --- [ADD THESE THREE NEW PAGE IMPORTS] ---
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";

// --- Component Imports ---
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

// Define all routes using the object-based approach
const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <Index />, errorElement: <NotFound /> },
  { path: "/products", element: <Products /> },
  { path: "/performance", element: <Performance /> },
  { path: "/about", element: <About /> },
  { path: "/learn", element: <Learn /> },
  { path: "/contact", element: <Contact /> },
  { path: "/disclaimer", element: <Disclaimer /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/please-verify", element: <PleaseVerify /> },
  
  // --- [ADD THESE THREE NEW PUBLIC ROUTES] ---
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/refund-policy", element: <RefundPolicy /> },

  // Protected routes for standard users
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  
  // Protected routes for admins
  {
    element: <AdminRoute />,
    children: [
      { path: "/admin", element: <AdminDashboard /> },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;