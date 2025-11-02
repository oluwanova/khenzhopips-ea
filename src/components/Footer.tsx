import { Link } from "react-router-dom";
import { Youtube, Twitter, Send, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-foreground font-bold text-xl">
                KP
              </div>
              <span className="font-bold text-xl">KhenzhoPips</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Advanced algorithmic trading systems engineered for disciplined traders seeking a statistical edge.
            </p>
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
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 KhenzhoPips EA. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Trading involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
