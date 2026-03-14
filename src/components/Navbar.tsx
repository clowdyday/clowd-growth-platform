import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import clowdLogo from "@/assets/clowd-logo.png";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  if (location.pathname.startsWith("/dashboard")) return null;
  if (location.pathname === "/auth") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto flex items-center justify-center h-16 px-4 md:px-6">
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 mr-6" aria-label="Clowd Marketing home">
            <img src={clowdLogo} alt="" className="h-8 w-8" width={32} height={32} aria-hidden="true" />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Clowd<span className="text-accent">.</span>
            </span>
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 ml-6">
            {user ? (
              <Button variant="cta" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="hero-secondary" size="sm" asChild>
                  <Link to="/estimate">Get Started</Link>
                </Button>
                <Button variant="cta" size="sm" asChild>
                  <Link to="/auth">Dashboard</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile: logo left, hamburger right */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-2" aria-label="Clowd Marketing home">
            <img src={clowdLogo} alt="" className="h-8 w-8" width={32} height={32} aria-hidden="true" />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Clowd<span className="text-accent">.</span>
            </span>
          </Link>

        {/* Mobile toggle */}
        <button
          className="p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3">
            {user ? (
              <Button variant="cta" size="sm" className="flex-1" asChild>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="hero-secondary" size="sm" className="flex-1" asChild>
                  <Link to="/estimate" onClick={() => setMobileOpen(false)}>Get Started</Link>
                </Button>
                <Button variant="cta" size="sm" className="flex-1" asChild>
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
