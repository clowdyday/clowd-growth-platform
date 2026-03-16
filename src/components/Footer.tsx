import { Link } from "react-router-dom";
import clowdLogo from "@/assets/clowd-logo.png";

const Footer = () => (
  <footer className="bg-background border-t border-border" role="contentinfo">
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <img src={clowdLogo} alt="Clowd Marketing logo" className="h-7 w-7" width={28} height={28} />
            <h3 className="font-display text-xl font-bold">
              Clowd Marketing<span className="text-accent">.</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Clowd Marketing — marketing systems built for contractors. Ad management, websites, and social media. More leads, better visibility, less hassle.
          </p>
        </div>
        <nav aria-label="Services">
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground/80">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-accent transition-colors">Ad Management</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-colors">Website Creation</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-colors">Organic Social Growth</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-accent transition-colors">About Clowd Marketing</Link></li>
            <li><Link to="/pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
            <li><Link to="/portal" className="hover:text-accent transition-colors">Client Portal</Link></li>
          </ul>
        </nav>
        <nav aria-label="Get started">
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground/80">Get Started</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/estimate" className="hover:text-accent transition-colors">Get an Estimate</Link></li>
            <li><Link to="/auth" className="hover:text-accent transition-colors">Create Account</Link></li>
            <li><Link to="/auth" className="hover:text-accent transition-colors">Dashboard Login</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Clowd Marketing (ClowdMarketing). All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;