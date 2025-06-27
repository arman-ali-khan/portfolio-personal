import { motion } from "framer-motion";
import { FiMenu, FiLogOut, FiBell, FiUser } from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminHeader = ({ user, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <motion.header
      className="bg-gray-800/50 backdrop-blur-xl border-b border-purple-500/30 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <FiMenu className="text-xl" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-white">Dashboard</h2>
            <p className="text-sm text-gray-400">Welcome back, Admin</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors relative">
            <FiBell className="text-xl" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center">
              <FiUser className="text-white text-sm" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">{user?.email}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:text-red-300 hover:bg-red-600/30 transition-colors"
          >
            <FiLogOut className="text-xl" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;