
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-2 bg-gradient-to-r from-sapphic-pink to-sapphic-purple bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-foreground/80 mb-8">Oops! We couldn't find that page</p>
        <p className="max-w-md mx-auto mb-8 text-foreground/60">
          The content you're looking for might have been moved, deleted, or may have never existed.
        </p>
        <Link to="/">
          <Button className="bg-sapphic-pink hover:bg-sapphic-pink/90">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
