import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Estimate", href: "/estimate" },
  { label: "Portal", href: "/portal" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-primary">
          Clowd<span className="text-accent">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-accent bg-accent/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="hero-secondary" size="sm" asChild>
            <Link to="/estimate">Get Estimate</Link>
          </Button>
          <Button variant="cta" size="sm" asChild>
            <Link to="/portal">Create Account</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-accent bg-accent/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3">
            <Button variant="hero-secondary" size="sm" className="flex-1" asChild>
              <Link to="/estimate" onClick={() => setMobileOpen(false)}>Get Estimate</Link>
            </Button>
            <Button variant="cta" size="sm" className="flex-1" asChild>
              <Link to="/portal" onClick={() => setMobileOpen(false)}>Create Account</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
