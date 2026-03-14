import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="gradient-hero min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>Page Not Found — Clowd Marketing</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center max-w-md">
        <div className="font-display text-8xl font-bold text-accent mb-4">404</div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" asChild>
            <Link to="/"><Home className="mr-1 w-4 h-4" /> Back to Home</Link>
          </Button>
          <Button variant="hero-secondary" asChild>
            <Link to="/estimate">Get Started <ArrowRight className="ml-1 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
