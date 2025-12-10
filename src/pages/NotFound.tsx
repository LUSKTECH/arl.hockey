import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice-white to-secondary dark:from-gray-900 dark:to-gray-800">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* 404 Content */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-4 text-navy-deep dark:text-primary">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-deep dark:text-foreground">
            Page Not Found
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <Link to="/">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl"
            >
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
