import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FiUsers, 
  FiGlobe, 
  FiTrendingUp, 
  FiMonitor,
  FiSmartphone,
  FiTablet
} from "react-icons/fi";
import { getVisitorAnalytics } from "../../lib/supabase";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DashboardOverview = () => {
  const [analytics, setAnalytics] = useState([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    uniqueCountries: 0,
    deviceTypes: {}
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const data = await getVisitorAnalytics();
    setAnalytics(data);
    calculateStats(data);
  };

  const calculateStats = (data) => {
    const today = new Date().toDateString();
    const todayVisitors = data.filter(visitor => 
      new Date(visitor.created_at).toDateString() === today
    ).length;

    const countries = [...new Set(data.map(visitor => visitor.country))];
    
    const deviceTypes = data.reduce((acc, visitor) => {
      const device = visitor.device_type || 'desktop';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});

    setStats({
      totalVisitors: data.length,
      todayVisitors,
      uniqueCountries: countries.length,
      deviceTypes
    });
  };

  const chartData = analytics.slice(0, 7).reverse().map(visitor => ({
    date: new Date(visitor.created_at).toLocaleDateString(),
    visitors: 1
  }));

  const deviceData = Object.entries(stats.deviceTypes).map(([device, count]) => ({
    name: device,
    value: count,
    color: device === 'mobile' ? '#8B5CF6' : device === 'tablet' ? '#06B6D4' : '#10B981'
  }));

  const statCards = [
    {
      title: "Total Visitors",
      value: stats.totalVisitors,
      icon: FiUsers,
      color: "from-blue-600 to-blue-700",
      change: "+12%"
    },
    {
      title: "Today's Visitors",
      value: stats.todayVisitors,
      icon: FiTrendingUp,
      color: "from-green-600 to-green-700",
      change: "+5%"
    },
    {
      title: "Countries",
      value: stats.uniqueCountries,
      icon: FiGlobe,
      color: "from-purple-600 to-purple-700",
      change: "+3%"
    },
    {
      title: "Active Sessions",
      value: Math.floor(stats.totalVisitors * 0.1),
      icon: FiMonitor,
      color: "from-orange-600 to-orange-700",
      change: "+8%"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
                <p className="text-green-400 text-sm mt-1">{card.change} from last week</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Visitor Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #8B5CF6',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Device Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Recent Visitors</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">Location</th>
                <th className="text-left py-3 px-4 text-gray-300">Device</th>
                <th className="text-left py-3 px-4 text-gray-300">Browser</th>
                <th className="text-left py-3 px-4 text-gray-300">Time</th>
              </tr>
            </thead>
            <tbody>
              {analytics.slice(0, 5).map((visitor, index) => (
                <tr key={index} className="border-b border-gray-700/50">
                  <td className="py-3 px-4 text-white">
                    {visitor.city}, {visitor.country}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {visitor.device_type || 'Desktop'}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {visitor.browser}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {new Date(visitor.created_at).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;