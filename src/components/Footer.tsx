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
              Clowd<span className="text-accent">.</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Performance-driven digital marketing for service-based and e-commerce businesses. Ads, websites, and social media — built to scale.
          </p>
        </div>
        <nav aria-label="Services">
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground/80">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-accent transition-colors">Ad Management</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-colors">Website Design</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-colors">Organic Social Growth</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
            <li><Link to="/portal" className="hover:text-accent transition-colors">Client Portal</Link></li>
          </ul>
        </nav>
        <nav aria-label="Get started">
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground/80">Get Started</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/estimate" className="hover:text-accent transition-colors">Free Strategy & Estimate</Link></li>
            <li><Link to="/auth" className="hover:text-accent transition-colors">Create Account</Link></li>
            <li><Link to="/auth" className="hover:text-accent transition-colors">Client Login</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Clowd Marketing. All rights reserved.</span>
        <span>Performance-driven digital marketing for ambitious businesses.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
