import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiSave, FiEdit3, FiImage, FiPlus, FiTrash2, FiUsers, FiMail, FiSettings } from "react-icons/fi";
import { updatePortfolioData, getPortfolioData } from "../../lib/supabase";

const ContentManager = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: "personal", label: "Personal Info", icon: FiEdit3 },
    { id: "about", label: "About", icon: FiEdit3 },
    { id: "services", label: "Services", icon: FiSettings },
    { id: "portfolio", label: "Portfolio", icon: FiImage },
    { id: "skills", label: "Skills", icon: FiEdit3 },
    { id: "qualification", label: "Qualification", icon: FiEdit3 },
    { id: "testimonial", label: "Testimonials", icon: FiUsers },
    { id: "contact", label: "Contact", icon: FiMail },
  ];

  useEffect(() => {
    loadSectionData();
  }, [activeSection]);

  const loadSectionData = async () => {
    try {
      const data = await getPortfolioData(activeSection);
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
      setFormData({});
    }
  };

  const handleSave = async () => {
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

  const addArrayItem = (path, defaultItem) => {
    const keys = path.split(".");
    const newData = { ...formData };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    if (!current[keys[keys.length - 1]]) {
      current[keys[keys.length - 1]] = [];
    }
    
    current[keys[keys.length - 1]].push(defaultItem);
    setFormData(newData);
  };

  const removeArrayItem = (path, index) => {
    const keys = path.split(".");
    const newData = { ...formData };
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]].splice(index, 1);
    setFormData(newData);
  };

  const renderPersonalForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.name?.[0] || ""}
            onChange={(e) => handleInputChange("name.0", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          value={formData.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Resume URL</label>
          <input
            type="url"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.resumeUrl || ""}
            onChange={(e) => handleInputChange("resumeUrl", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image URL</label>
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
              <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">{platform}</label>
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
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          rows={6}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          value={formData.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.experience || ""}
            onChange={(e) => handleInputChange("experience", parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Completed Projects</label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.project || ""}
            onChange={(e) => handleInputChange("project", parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Companies Worked</label>
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
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
            value={formData.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
        <input
          type="text"
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          value={formData.address || ""}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">About Image URL</label>
        <input
          type="url"
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          value={formData.image || ""}
          onChange={(e) => handleInputChange("image", e.target.value)}
        />
      </div>
    </div>
  );

  const renderServicesForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Services</h3>
        <button
          onClick={() => addArrayItem("", { id: Date.now(), name: "", icon: "", description: "" })}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <FiPlus />
          <span>Add Service</span>
        </button>
      </div>

      {Array.isArray(formData) && formData.map((service, index) => (
        <div key={service.id || index} className="bg-gray-700/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Service {index + 1}</h4>
            <button
              onClick={() => removeArrayItem("", index)}
              className="text-red-400 hover:text-red-300"
            >
              <FiTrash2 />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                value={service.name || ""}
                onChange={(e) => {
                  const newData = [...formData];
                  newData[index] = { ...newData[index], name: e.target.value };
                  setFormData(newData);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icon URL</label>
              <input
                type="url"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                value={service.icon || ""}
                onChange={(e) => {
                  const newData = [...formData];
                  newData[index] = { ...newData[index], icon: e.target.value };
                  setFormData(newData);
                }}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
              value={service.description || ""}
              onChange={(e) => {
                const newData = [...formData];
                newData[index] = { ...newData[index], description: e.target.value };
                setFormData(newData);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderPortfolioForm = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-300">Portfolio Categories</span>
          <button
            onClick={() => addArrayItem("categories", { value: "", label: "" })}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <FiPlus />
            <span>Add Category</span>
          </button>
        </div>

        {formData.categories?.map((category, index) => (
          <div key={index} className="bg-gray-700/30 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-medium">Category {index + 1}</h4>
              <button
                onClick={() => removeArrayItem("categories", index)}
                className="text-red-400 hover:text-red-300"
              >
                <FiTrash2 />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={category.value || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.categories[index] = { ...newData.categories[index], value: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={category.label || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.categories[index] = { ...newData.categories[index], label: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Portfolio Items</h3>
          <button
            onClick={() => addArrayItem("data", { image: "", category: "", title: "", githuUrl: "", liveLink: "" })}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <FiPlus />
            <span>Add Portfolio Item</span>
          </button>
        </div>

        {formData.data?.map((item, index) => (
          <div key={index} className="bg-gray-700/30 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-medium">Portfolio Item {index + 1}</h4>
              <button
                onClick={() => removeArrayItem("data", index)}
                className="text-red-400 hover:text-red-300"
              >
                <FiTrash2 />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={item.title || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.data[index] = { ...newData.data[index], title: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={item.category || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.data[index] = { ...newData.data[index], category: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={item.image || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.data[index] = { ...newData.data[index], image: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={item.githuUrl || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.data[index] = { ...newData.data[index], githuUrl: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Live Link</label>
                <input
                  type="url"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={item.liveLink || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.data[index] = { ...newData.data[index], liveLink: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Skills</h3>
        <button
          onClick={() => addArrayItem("", { id: Date.now(), title: "", experience: 0, icon: "", stacks: [] })}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <FiPlus />
          <span>Add Skill Category</span>
        </button>
      </div>

      {Array.isArray(formData) && formData.map((skill, index) => (
        <div key={skill.id || index} className="bg-gray-700/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Skill Category {index + 1}</h4>
            <button
              onClick={() => removeArrayItem("", index)}
              className="text-red-400 hover:text-red-300"
            >
              <FiTrash2 />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                value={skill.title || ""}
                onChange={(e) => {
                  const newData = [...formData];
                  newData[index] = { ...newData[index], title: e.target.value };
                  setFormData(newData);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Experience (years)</label>
              <input
                type="number"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                value={skill.experience || ""}
                onChange={(e) => {
                  const newData = [...formData];
                  newData[index] = { ...newData[index], experience: parseInt(e.target.value) };
                  setFormData(newData);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Icon URL</label>
              <input
                type="url"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                value={skill.icon || ""}
                onChange={(e) => {
                  const newData = [...formData];
                  newData[index] = { ...newData[index], icon: e.target.value };
                  setFormData(newData);
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">Tech Stacks</label>
              <button
                onClick={() => {
                  const newData = [...formData];
                  if (!newData[index].stacks) newData[index].stacks = [];
                  newData[index].stacks.push({ title: "", icon: "" });
                  setFormData(newData);
                }}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                + Add Stack
              </button>
            </div>
            
            {skill.stacks?.map((stack, stackIndex) => (
              <div key={stackIndex} className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Stack name"
                  className="px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-white text-sm"
                  value={stack.title || ""}
                  onChange={(e) => {
                    const newData = [...formData];
                    newData[index].stacks[stackIndex] = { ...newData[index].stacks[stackIndex], title: e.target.value };
                    setFormData(newData);
                  }}
                />
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Icon URL"
                    className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-white text-sm"
                    value={stack.icon || ""}
                    onChange={(e) => {
                      const newData = [...formData];
                      newData[index].stacks[stackIndex] = { ...newData[index].stacks[stackIndex], icon: e.target.value };
                      setFormData(newData);
                    }}
                  />
                  <button
                    onClick={() => {
                      const newData = [...formData];
                      newData[index].stacks.splice(stackIndex, 1);
                      setFormData(newData);
                    }}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderQualificationForm = () => (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Education</h3>
          <button
            onClick={() => addArrayItem("educations", { id: Date.now(), title: "", year: "", institute: "" })}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <FiPlus />
            <span>Add Education</span>
          </button>
        </div>

        {formData.educations?.map((education, index) => (
          <div key={education.id || index} className="bg-gray-700/30 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-medium">Education {index + 1}</h4>
              <button
                onClick={() => removeArrayItem("educations", index)}
                className="text-red-400 hover:text-red-300"
              >
                <FiTrash2 />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={education.title || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.educations[index] = { ...newData.educations[index], title: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={education.year || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.educations[index] = { ...newData.educations[index], year: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Institute</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={education.institute || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.educations[index] = { ...newData.educations[index], institute: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Experience</h3>
          <button
            onClick={() => addArrayItem("experiences", { id: Date.now(), title: "", year: "", institute: "" })}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <FiPlus />
            <span>Add Experience</span>
          </button>
        </div>

        {formData.experiences?.map((experience, index) => (
          <div key={experience.id || index} className="bg-gray-700/30 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-medium">Experience {index + 1}</h4>
              <button
                onClick={() => removeArrayItem("experiences", index)}
                className="text-red-400 hover:text-red-300"
              >
                <FiTrash2 />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={experience.title || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.experiences[index] = { ...newData.experiences[index], title: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={experience.year || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.experiences[index] = { ...newData.experiences[index], year: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  value={experience.institute || ""}
                  onChange={(e) => {
                    const newData = { ...formData };
                    newData.experiences[index] = { ...newData.experiences[index], institute: e.target.value };
                    setFormData(newData);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Testimonials</h3>
        <button
          onClick={() => addArrayItem("", { id: Date.now(), name: "", address: "", message: "", image: "" })}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <FiPlus />
          <span>Add Testimonial</span>
        </button>
      </div>

      {Array.isArray(formData) && formData.map((testimonial, index) => (
        <div key={testimonial.id || index} className="bg-gray-700/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Testimonial {index + 1}</h4>
            <button
              onClick={() => removeArrayItem("", index)}
              className="text-red-400 hover:text-red-300"
            >
              <FiTrash2 />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                value={testimonial.name || ""}
                onChange={(e) => {
                  const newData = [...formData];
                  newData[index] = { ...newData[index], name: e.target.value };
                  setFormData(newData);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                value={testimonial.address || ""}
                onChange={(e) => {
                  const newData = [...formData];
                  newData[index] = { ...newData[index], address: e.target.value };
                  setFormData(newData);
                }}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
              value={testimonial.image || ""}
              onChange={(e) => {
                const newData = [...formData];
                newData[index] = { ...newData[index], image: e.target.value };
                setFormData(newData);
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
              value={testimonial.message || ""}
              onChange={(e) => {
                const newData = [...formData];
                newData[index] = { ...newData[index], message: e.target.value };
                setFormData(newData);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderForm = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalForm();
      case "about":
        return renderAboutForm();
      case "services":
        return renderServicesForm();
      case "portfolio":
        return renderPortfolioForm();
      case "skills":
        return renderSkillsForm();
      case "qualification":
        return renderQualificationForm();
      case "testimonial":
        return renderTestimonialForm();
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
                disabled={loading}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-200 disabled:opacity-50"
              >
                <FiSave />
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {renderForm()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentManager;