import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthDialog } from "./auth/AuthDialog";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard", authRequired: true },
    { label: "Gamification", href: "/gamification", authRequired: true },
  ];

  const handleNavClick = (href: string, authRequired?: boolean) => {
    if (authRequired && !user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access this feature",
      });
      setAuthOpen(true);
      return;
    }
    navigate(href);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out",
    });
    navigate("/");
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-card">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a 
              href="/" 
              className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center text-primary-foreground shadow-glow">
                FM
              </div>
              <span>FinMate</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, item.authRequired)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setAuthOpen(true)}>
                    Sign In
                  </Button>
                  <Button variant="hero" onClick={() => setAuthOpen(true)}>
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href, item.authRequired)}
                    className={`text-left px-4 py-2 transition-colors ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex flex-col gap-2 px-4 pt-4 border-t border-border/50">
                  {user ? (
                    <>
                      <span className="text-sm text-muted-foreground mb-2">
                        {user.email}
                      </span>
                      <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" className="w-full" onClick={() => setAuthOpen(true)}>
                        Sign In
                      </Button>
                      <Button variant="hero" className="w-full" onClick={() => setAuthOpen(true)}>
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default Navigation;
