import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiFilter, FiSearch, FiMapPin, FiMonitor } from "react-icons/fi";
import { getVisitorAnalytics } from "../../lib/supabase";

const VisitorAnalytics = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitors();
  }, []);

  useEffect(() => {
    filterVisitors();
  }, [visitors, searchTerm, filterBy]);

  const fetchVisitors = async () => {
    setLoading(true);
    const data = await getVisitorAnalytics();
    setVisitors(data);
    setLoading(false);
  };

  const filterVisitors = () => {
    let filtered = visitors;

    if (searchTerm) {
      filtered = filtered.filter(visitor =>
        visitor.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.ip_address?.includes(searchTerm) ||
        visitor.browser?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy !== "all") {
      filtered = filtered.filter(visitor => visitor.device_type === filterBy);
    }

    setFilteredVisitors(filtered);
  };

  const exportData = () => {
    const csvContent = [
      ["IP Address", "Country", "City", "Device", "Browser", "OS", "Screen Resolution", "Visit Time"],
      ...filteredVisitors.map(visitor => [
        visitor.ip_address,
        visitor.country,
        visitor.city,
        visitor.device_type || 'Desktop',
        visitor.browser,
        visitor.os,
        visitor.screen_resolution,
        new Date(visitor.created_at).toLocaleString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "visitor-analytics.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-white">Visitor Analytics</h2>
          <p className="text-gray-400">Detailed visitor information and tracking</p>
        </div>
        <button
          onClick={exportData}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-200"
        >
          <FiDownload />
          <span>Export CSV</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by country, city, IP, or browser..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Devices</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="desktop">Desktop</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">IP Address</th>
                <th className="text-left py-3 px-4 text-gray-300">Location</th>
                <th className="text-left py-3 px-4 text-gray-300">Device Info</th>
                <th className="text-left py-3 px-4 text-gray-300">Browser</th>
                <th className="text-left py-3 px-4 text-gray-300">Screen</th>
                <th className="text-left py-3 px-4 text-gray-300">Visit Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((visitor, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-white font-mono text-xs">
                    {visitor.ip_address}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="text-purple-400" />
                      <div>
                        <p className="text-white text-sm">{visitor.city}</p>
                        <p className="text-gray-400 text-xs">{visitor.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FiMonitor className="text-blue-400" />
                      <div>
                        <p className="text-white text-sm capitalize">
                          {visitor.device_type || 'Desktop'}
                        </p>
                        <p className="text-gray-400 text-xs">{visitor.os}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-white text-sm">{visitor.browser}</p>
                    <p className="text-gray-400 text-xs">{visitor.browser_version}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-300 text-xs">
                    {visitor.screen_resolution}
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-white text-sm">
                      {new Date(visitor.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(visitor.created_at).toLocaleTimeString()}
                    </p>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVisitors.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No visitors found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VisitorAnalytics;