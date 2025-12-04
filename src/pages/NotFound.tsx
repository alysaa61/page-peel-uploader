import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-terminal">
      <div className="text-center border border-primary p-8">
        <h1 className="mb-4 text-4xl font-pixel text-primary">404</h1>
        <p className="mb-4 text-xl text-foreground">ERROR: Route not found</p>
        <p className="mb-4 text-sm text-muted-foreground">The neural pathway you seek does not exist.</p>
        <a href="/" className="text-accent underline hover:text-primary transition-colors">
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
