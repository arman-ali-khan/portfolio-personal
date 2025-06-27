import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiSave, FiEdit3, FiImage, FiLink, FiAlertCircle } from "react-icons/fi";
import { updatePortfolioData, getPortfolioData, isSupabaseAvailable } from "../../lib/supabase";

const ContentManager = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: "personal", label: "Personal Info", icon: FiEdit3 },
    { id: "about", label: "About", icon: FiEdit3 },
    { id: "services", label: "Services", icon: FiEdit3 },
    { id: "portfolio", label: "Portfolio", icon: FiImage },
    { id: "skills", label: "Skills", icon: FiEdit3 },
  ];

  useEffect(() => {
    loadSectionData();
  }, [activeSection]);

  const loadSectionData = async () => {
    try {
      let data = null;
      
      // Try to get data from Supabase first if available
      if (isSupabaseAvailable()) {
        data = await getPortfolioData(activeSection);
      }
      
      if (data) {
        setFormData(data);
      } else {
        // Load default data from JSON files
        const response = await fetch(`/data/${activeSection}.json`);
        const defaultData = await response.json();
        setFormData(defaultData);
      }
    } catch (error) {
      console.error("Error loading section data:", error);
      // Try to load from JSON as fallback
      try {
        const response = await fetch(`/data/${activeSection}.json`);
        const defaultData = await response.json();
        setFormData(defaultData);
      } catch (fallbackError) {
        console.error("Error loading fallback data:", fallbackError);
        toast.error("Error loading section data");
      }
    }
  };

  const handleSave = async () => {
    if (!isSupabaseAvailable()) {
      toast.error("Supabase not connected. Cannot save changes.");
      return;
    }

    setLoading(true);
    try {
      await updatePortfolioData(activeSection, formData);
      toast.success("Content updated successfully!");
    } catch (error) {
      toast.error("Error updating content");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (path, value) => {
    const keys = path.split(".");
    const newData = { ...formData };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setFormData(newData);
  };

  const renderPersonalForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.name?.[0] || ""}
            onChange={(e) => handleInputChange("name.0", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          value={formData.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Resume URL
          </label>
          <input
            type="url"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.resumeUrl || ""}
            onChange={(e) => handleInputChange("resumeUrl", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Profile Image URL
          </label>
          <input
            type="url"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.image || ""}
            onChange={(e) => handleInputChange("image", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["facebook", "github", "linkedin", "twitter", "discord"].map((platform) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                {platform}
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                value={formData.social?.[platform] || ""}
                onChange={(e) => handleInputChange(`social.${platform}`, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAboutForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          rows={6}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          value={formData.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.experience || ""}
            onChange={(e) => handleInputChange("experience", parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Completed Projects
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.project || ""}
            onChange={(e) => handleInputChange("project", parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Companies Worked
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.companies || ""}
            onChange={(e) => handleInputChange("companies", parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Address
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          value={formData.address || ""}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
      </div>
    </div>
  );

  const renderForm = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalForm();
      case "about":
        return renderAboutForm();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-400">Content editor for {activeSection} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Content Manager</h2>
        <p className="text-gray-400">Edit and manage your portfolio content</p>
      </motion.div>

      {!isSupabaseAvailable() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3">
            <FiAlertCircle className="text-yellow-400 text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-400">Supabase Not Connected</h3>
              <p className="text-yellow-300 text-sm">
                Connect to Supabase to save content changes. You can still edit content, but changes won't be saved.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
                >
                  <section.icon className="text-lg" />
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Edit {sections.find(s => s.id === activeSection)?.label}
              </h3>
              <button
                onClick={handleSave}
                disabled={loading || !isSupabaseAvailable()}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-200 disabled:opacity-50"
              >
                <FiSave />
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>

            {renderForm()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentManager;