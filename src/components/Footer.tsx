import { Link } from "react-router-dom";
import { Youtube, Twitter, Send, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/KhenzhoPips Logo.png" alt="KhenzhoPips Logo" className="h-10" />
              <span className="font-bold text-xl">KhenzhoPips</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Advanced algorithmic trading systems engineered for disciplined traders seeking a statistical edge.
            </p>
            <div className="mt-6 text-xs text-muted-foreground">
              <p>&copy; 2024 KhenzhoPips EA. All rights reserved.</p>
              <p className="mt-1">
                Trading involves risk. Past performance is not indicative of future results.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-smooth">
                  EA Products
                </Link>
              </li>
              <li>
                <Link to="/performance" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Live Performance Hub
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Education Resources
                </Link>
              </li>
              <li>
                <a href="https://khhenzhopips.gumroad.com/l/KhenzhoPipsEA-LA" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Purchase on Gumroad
                </a>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Risk Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Join Community */}
          <div>
            <h4 className="font-semibold mb-4">Join Our Community</h4>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://t.me/khenzhopips"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
              <a
                href="https://www.youtube.com/@KhenzhoPips"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://twitter.com/khenzhopips"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/khenzhopips/"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@khenzhopips"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tiktok"><path d="M12 12a4 4 0 1 0 4 4v-12a5 5 0 0 0-5-5v12a5 5 0 0 0 5 5Z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* --- [NEW] Legal Links Section --- */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs">
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
            </Link>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
            </Link>
            <Link to="/refund-policy" className="text-muted-foreground hover:text-foreground transition-smooth">
                Refund Policy
            </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;