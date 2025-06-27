import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiHome, 
  FiBarChart3, 
  FiEdit3, 
  FiSettings, 
  FiUsers,
  FiGlobe
} from "react-icons/fi";

const AdminSidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/admin/analytics", icon: FiBarChart3, label: "Analytics" },
    { path: "/admin/content", icon: FiEdit3, label: "Content" },
    { path: "/admin/settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-gray-800/95 backdrop-blur-xl border-r border-purple-500/30 transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-16"
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
    >
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
            <FiGlobe className="text-white text-lg" />
          </div>
          {isOpen && (
            <motion.h1
              className="text-xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Web3 Admin
            </motion.h1>
          )}
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              <item.icon className="text-xl" />
              {isOpen && (
                <motion.span
                  className="ml-3 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"}`}>
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <FiUsers className="text-white text-sm" />
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-white font-medium">Admin Panel</p>
              <p className="text-xs text-gray-400">v2.0.0</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;