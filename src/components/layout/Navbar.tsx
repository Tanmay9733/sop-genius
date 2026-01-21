import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, MessageSquare, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isAdmin?: boolean;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar = ({ isAdmin = false, isLoggedIn = false, onLogout }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = isLoggedIn
    ? isAdmin
      ? [
          { path: "/admin", label: "Dashboard", icon: Settings },
          { path: "/admin/upload", label: "Upload", icon: FileText },
          { path: "/admin/documents", label: "Documents", icon: FileText },
          { path: "/chat", label: "Chat", icon: MessageSquare },
        ]
      : [
          { path: "/chat", label: "Chat", icon: MessageSquare },
        ]
    : [];

  return (
    <nav className="sticky top-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg btn-gradient flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">SOP Agent</span>
            {isAdmin && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
                Admin
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link flex items-center gap-2 ${isActive(link.path) ? "active" : ""}`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="sm" className="btn-gradient">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link flex items-center gap-2 ${isActive(link.path) ? "active" : ""}`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    onLogout?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="nav-link flex items-center gap-2 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-link flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
