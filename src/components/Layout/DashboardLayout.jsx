import Logo from "@/components/Common/Logo";
import { useAuth } from "@/Contexts/AuthContext";
import { useTheme } from "@/Contexts/ThemeContext";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  FileText,
  Home,
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
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { Button } from "../ui/button";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const sidebarLinks = [
    {
      to: "/dashboard",
      label: "Overview",
      icon: Home,
      end: true,
    },
    {
      to: "/dashboard/transactions",
      label: "All Transactions",
      icon: FileText,
    },
    {
      to: "/dashboard/add-transaction",
      label: "Add Transaction",
      icon: Plus,
    },
    {
      to: "/dashboard/reports",
      label: "Reports",
      icon: BarChart3,
    },
    {
      to: "/dashboard/my-blogs",
      label: "My Blogs",
      icon: BookOpen,
    },
    {
      to: "/dashboard/profile",
      label: "Profile",
      icon: Settings,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* Left: Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            {/* Logo */}
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <Logo size="sm" />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors"
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                )}
                <span className="text-sm font-medium hidden sm:block max-w-[120px] truncate">
                  {currentUser?.displayName?.split(" ")[0] || "User"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium truncate">
                      {currentUser?.displayName || "User"}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {currentUser?.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Settings size={16} className="text-muted-foreground" />
                      <span className="text-sm">Profile Settings</span>
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Home size={16} className="text-muted-foreground" />
                      <span className="text-sm">Back to Home</span>
                    </Link>
                  </div>
                  <div className="p-2 border-t border-border">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* User Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-6">
            <div className="flex items-center gap-3">
              {currentUser?.photoURL ? (
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
              <div className="overflow-hidden">
                <p className="font-semibold truncate">
                  {currentUser?.displayName || "User"}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Wallet size={12} />
                  <span>Personal Account</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setSidebarOpen(false)}
                  className={navLinkClass}
                >
                  <Icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
