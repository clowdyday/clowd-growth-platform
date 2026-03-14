import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h3 className="font-display text-xl font-bold mb-3">
            Clowd<span className="text-accent">.</span>
          </h3>
          <p className="text-sm text-primary-foreground/60 leading-relaxed">
            Marketing systems built for contractors. More leads, better visibility, less hassle.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-primary-foreground/80">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/50">
            <li><Link to="/services" className="hover:text-accent transition-colors">Ad Management</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-colors">Website Creation</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-colors">Organic Growth</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-primary-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/50">
            <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
            <li><Link to="/pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
            <li><Link to="/portal" className="hover:text-accent transition-colors">Client Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-primary-foreground/80">Get Started</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/50">
            <li><Link to="/estimate" className="hover:text-accent transition-colors">Instant Estimate</Link></li>
            <li><Link to="/portal" className="hover:text-accent transition-colors">Create Account</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} Clowd Marketing. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
