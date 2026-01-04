import { Button } from "@/components/ui/button";
import { useAuth } from "@/Contexts/AuthContext";
import { useTheme } from "@/Contexts/ThemeContext";
import {
  BarChart3,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Plus,
  Settings,
  Sun,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
      if (!e.target.closest(".dashboard-dropdown")) {
        setIsDashboardOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setIsProfileOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Public navigation links (always visible)
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
  ];

  // Dashboard dropdown items (for logged-in users)
  const dashboardLinks = [
    {
      to: "/my-transactions",
      label: "All Transactions",
      icon: FileText,
      description: "View your transaction history",
    },
    {
      to: "/add-transaction",
      label: "Add Transaction",
      icon: Plus,
      description: "Record new income or expense",
    },
    {
      to: "/reports",
      label: "Reports & Analytics",
      icon: BarChart3,
      description: "Visualize your financial data",
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-wide">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow">
              <span className="text-white text-xl font-bold font-outfit">
                F
              </span>
            </div>
            <span className="text-xl font-bold font-outfit">FinEase</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Public Links - Always Visible */}
            {publicLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}

            {/* Dashboard Dropdown - Only for logged-in users */}
            {currentUser && (
              <div className="relative dashboard-dropdown">
                <button
                  onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isDashboardOpen
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      isDashboardOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dashboard Dropdown Menu */}
                {isDashboardOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Wallet size={16} className="text-primary" />
                        Financial Dashboard
                      </p>
                    </div>

                    {/* Links */}
                    <div className="p-2">
                      {dashboardLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsDashboardOpen(false)}
                            className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                              <Icon size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {link.label}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {link.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Quick Stats */}
                    <div className="px-4 py-3 bg-muted/50 border-t border-border">
                      <Link
                        to="/my-transactions"
                        onClick={() => setIsDashboardOpen(false)}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        View all transactions →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact - Always visible */}
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {currentUser ? (
              // Logged in: Profile dropdown
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors border border-border"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {currentUser.displayName?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="p-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
                      <div className="flex items-center gap-3">
                        {currentUser.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt={currentUser.displayName}
                            className="w-12 h-12 rounded-xl object-cover border-2 border-white/50"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                            <User size={24} className="text-white" />
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="font-semibold truncate">
                            {currentUser.displayName || "User"}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors"
                      >
                        <Settings size={18} className="text-muted-foreground" />
                        <span>Account Settings</span>
                      </Link>
                      <Link
                        to="/my-transactions"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors"
                      >
                        <LayoutDashboard
                          size={18}
                          className="text-muted-foreground"
                        />
                        <span>My Dashboard</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-border">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in: Auth buttons
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="rounded-xl">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-xl bg-gradient-primary hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {currentUser && (
                // Logged in: User Info Card
                <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">
                      {currentUser.displayName || "User"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Public Links */}
              {publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-muted transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}

              {currentUser && (
                // Dashboard Section for logged-in users
                <>
                  <div className="px-4 py-2 mt-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <LayoutDashboard size={14} />
                      Dashboard
                    </p>
                  </div>
                  {dashboardLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{link.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-muted transition-colors font-medium"
              >
                Contact
              </Link>

              {currentUser ? (
                // Logged in: Profile & Logout
                <>
                  <div className="border-t border-border mt-3 pt-3">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <Settings size={18} className="text-muted-foreground" />
                      <span>Account Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                // Not logged in: Auth buttons
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full rounded-xl bg-gradient-primary hover:opacity-90">
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
