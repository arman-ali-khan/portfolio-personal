import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiSave, FiKey, FiDatabase, FiMail, FiShield } from "react-icons/fi";

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    siteTitle: "Web3 Portfolio",
    siteDescription: "Modern Web3 Portfolio with Admin Dashboard",
    adminEmail: "admin@example.com",
    enableAnalytics: true,
    enableVisitorTracking: true,
    maxVisitorRetention: 90,
    emailNotifications: true,
    securityLevel: "high"
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-400">Configure your portfolio and admin panel</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* General Settings */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiDatabase className="text-purple-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">General Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Site Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={settings.siteTitle}
                  onChange={(e) => handleInputChange("siteTitle", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Site Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Analytics Settings */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiShield className="text-green-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">Analytics & Tracking</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Enable Analytics</p>
                  <p className="text-gray-400 text-sm">Track visitor behavior and statistics</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.enableAnalytics}
                    onChange={(e) => handleInputChange("enableAnalytics", e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Visitor Tracking</p>
                  <p className="text-gray-400 text-sm">Collect detailed visitor information</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.enableVisitorTracking}
                    onChange={(e) => handleInputChange("enableVisitorTracking", e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data Retention (days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={settings.maxVisitorRetention}
                  onChange={(e) => handleInputChange("maxVisitorRetention", parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Security Settings */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiKey className="text-red-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">Security Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Security Level
                </label>
                <select
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={settings.securityLevel}
                  onChange={(e) => handleInputChange("securityLevel", e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  <strong>Security Notice:</strong> High security level enables additional protection measures including IP filtering and enhanced authentication.
                </p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiMail className="text-blue-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-gray-400 text-sm">Receive email alerts for important events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange("emailNotifications", e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Database Info */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FiDatabase className="text-emerald-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">Database Status</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Connection Status</span>
                <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Visitors</span>
                <span className="text-white font-medium">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Database Size</span>
                <span className="text-white font-medium">2.4 MB</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-200 disabled:opacity-50"
        >
          <FiSave />
          <span>{loading ? "Saving..." : "Save All Settings"}</span>
        </button>
      </motion.div>
    </div>
  );
};

export default SettingsPanel;