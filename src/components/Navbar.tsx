import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth(); // Use 'user' from your AuthContext

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Performance", path: "/performance" },
    { name: "About", path: "/about" },
    { name: "Learn", path: "/learn" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <img src="/KhenzhoPips Logo.png" alt="KhenzhoPips Logo" className="h-10" />
            <span className="font-bold text-xl hidden sm:inline">KhenzhoPips</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${isActive(link.path) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Button asChild variant="ghost" size="sm"><Link to="/dashboard">Dashboard</Link></Button>
                <Button onClick={handleLogout} variant="secondary" size="sm">Logout</Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm"><Link to="/login">Login</Link></Button>
                <Button asChild size="sm" className="gradient-primary"><Link to="/signup">Sign Up</Link></Button>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg" aria-controls="mobile-menu" aria-expanded={isOpen}>
            <span className="sr-only">Open menu</span>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`lg:hidden absolute top-16 left-0 w-full bg-background border-b transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ height: 'calc(100vh - 4rem)' }}>
        <div className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`px-4 py-3 rounded-lg text-base font-medium ${isActive(link.path) ? "text-primary bg-primary/10" : "text-muted-foreground"}`}>
              {link.name}
            </Link>
          ))}
          <div className="border-t mt-4 pt-4 flex flex-col gap-2">
            {user ? (
              <>
                <Button asChild variant="ghost" size="sm" className="w-full"><Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></Button>
                <Button onClick={() => { handleLogout(); setIsOpen(false); }} variant="secondary" size="sm" className="w-full">Logout</Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="w-full"><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></Button>
                <Button asChild size="sm" className="w-full gradient-primary"><Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link></Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;