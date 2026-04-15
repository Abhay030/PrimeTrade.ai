import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, LayoutDashboard, CheckSquare, Shield, Zap } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLink = (to, label, Icon) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${isActive
            ? "bg-primary-600/20 text-primary-400"
            : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
      >
        <Icon size={16} />
        {label}
      </Link>
    );
  };

  if (!user) return null;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <Zap className="text-primary-400" size={24} />
            <span className="text-lg font-bold gradient-text">PrimeTrade</span>
          </Link>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-1">
            {navLink("/dashboard", "Dashboard", LayoutDashboard)}
            {navLink("/tasks", "Tasks", CheckSquare)}
            {user.role === "admin" && navLink("/admin", "Admin", Shield)}
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-white/40 capitalize">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {navLink("/dashboard", "Dashboard", LayoutDashboard)}
          {navLink("/tasks", "Tasks", CheckSquare)}
          {user.role === "admin" && navLink("/admin", "Admin", Shield)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
