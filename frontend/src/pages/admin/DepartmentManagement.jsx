import { useState, useEffect } from "react";
import { Users, Plus, Edit2, Trash2, Building2, TrendingUp, Target, Award, ArrowLeft, Bell, Settings, RefreshCw, Search, X, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../../api/adminApi";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    manager_name: "",
    manager_email: "",
    budget: "",
    location: "",
    status: "active"
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    setLoading(true);
    try {
      const data = await getDepartments({ include_stats: true });
      setDepartments(data);
    } catch (error) {
      console.error("Failed to load departments:", error);
      toast.error("Failed to load departments");
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadDepartments();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedDepartment(null);
    setFormData({
      name: "",
      code: "",
      description: "",
      manager_name: "",
      manager_email: "",
      budget: "",
      location: "",
      status: "active"
    });
    setFormErrors({});
    setShowModal(true);
  };

  const openEditModal = (dept) => {
    setModalMode("edit");
    setSelectedDepartment(dept);
    setFormData({
      name: dept.name || "",
      code: dept.code || "",
      description: dept.description || "",
      manager_name: dept.manager_name || "",
      manager_email: dept.manager_email || "",
      budget: dept.budget || "",
      location: dept.location || "",
      status: dept.status || "active"
    });
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDepartment(null);
    setFormData({
      name: "",
      code: "",
      description: "",
      manager_name: "",
      manager_email: "",
      budget: "",
      location: "",
      status: "active"
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Department name is required";
    }
    
    if (!formData.code.trim()) {
      errors.code = "Department code is required";
    } else if (formData.code.length < 2) {
      errors.code = "Code must be at least 2 characters";
    }
    
    if (formData.manager_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.manager_email)) {
      errors.manager_email = "Invalid email format";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      if (modalMode === "create") {
        await createDepartment(formData);
        toast.success("Department created successfully!");
      } else {
        await updateDepartment(selectedDepartment.id, formData);
        toast.success("Department updated successfully!");
      }
      
      closeModal();
      await loadDepartments();
    } catch (error) {
      console.error("Failed to save department:", error);
      const errorMsg = error.response?.data?.detail || "Failed to save department";
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (dept) => {
    const hasEmployees = dept.employee_count > 0;
    
    const confirmMsg = hasEmployees
      ? `Delete "${dept.name}"? This department has ${dept.employee_count} employee(s). They will need to be reassigned.`
      : `Delete "${dept.name}"?`;
    
    if (!window.confirm(confirmMsg)) {
      return;
    }
    
    try {
      await deleteDepartment(dept.id, hasEmployees);
      toast.success("Department deleted successfully!");
      await loadDepartments();
    } catch (error) {
      console.error("Failed to delete department:", error);
      const errorMsg = error.response?.data?.detail || "Failed to delete department";
      toast.error(errorMsg);
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.manager_name && dept.manager_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalEmployees = departments.reduce((sum, dept) => sum + (dept.employee_count || 0), 0);
  const avgOrgPerformance = departments.length > 0 
    ? Math.round(departments.reduce((sum, dept) => sum + (dept.avg_performance || 0), 0) / departments.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Top Bar */}
      <div className="bg-[#0F1629] border-b border-white/5 px-8 py-4">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white">Admin Console</h1>
            <span className="text-gray-500">-</span>
            <span className="text-gray-400">Marcus Rivers</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
              ADMIN MODE
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Settings size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#0F1629] px-8 py-3 border-b border-white/5">
        <div className="max-w-[1800px] mx-auto flex items-center gap-2 text-sm">
          <Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-gray-600">{">"}</span>
          <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
            Admin
          </Link>
          <span className="text-gray-600">{">"}</span>
          <span className="text-indigo-400">Departments</span>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <motion.div {...fade(0)} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="text-indigo-400" size={32} />
              <h1 className="text-4xl font-bold text-white">Department Management</h1>
            </div>
            <p className="text-gray-400">Manage organizational departments and structure</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-3 hover:bg-white/5 rounded-lg transition-colors"
            >
              <RefreshCw size={20} className={`text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={openCreateModal}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20"
            >
              <Plus size={18} />
              Add Department
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div {...fade(0.05)} className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search departments, codes, or managers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0F1629] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <motion.div {...fade(0.1)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Building2 className="text-indigo-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Departments</p>
                <p className="text-3xl font-bold text-white">{departments.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.15)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <Users className="text-cyan-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Employees</p>
                <p className="text-3xl font-bold text-cyan-400">{totalEmployees}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.2)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Avg Performance</p>
                <p className="text-3xl font-bold text-emerald-400">{avgOrgPerformance}%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDepartments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0F1629] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/20 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <Building2 className="text-indigo-400" size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                      <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded border border-indigo-500/20">
                        {dept.code}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {dept.manager_name || "No Manager Assigned"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openEditModal(dept)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="text-gray-400 hover:text-white" size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(dept)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="text-gray-400 hover:text-red-400" size={16} />
                  </button>
                </div>
              </div>

              {/* Description */}
              {dept.description && (
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{dept.description}</p>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-cyan-400" />
                    <span className="text-xs text-gray-400 font-medium">Employees</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{dept.employee_count || 0}</p>
                </div>

                <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-emerald-400" />
                    <span className="text-xs text-gray-400 font-medium">Performance</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">{Math.round(dept.avg_performance || 0)}%</p>
                </div>

                <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={16} className="text-purple-400" />
                    <span className="text-xs text-gray-400 font-medium">Goals</span>
                  </div>
                  <p className="text-xl font-bold text-white">{dept.completed_goals || 0}/{dept.total_goals || 0}</p>
                </div>

                <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-amber-400" />
                    <span className="text-xs text-gray-400 font-medium">Budget</span>
                  </div>
                  <p className="text-lg font-bold text-white">{dept.budget || "N/A"}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-medium">Goal Completion</span>
                  <span className="text-white font-bold">
                    {Math.round(dept.completion_rate || 0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dept.completion_rate || 0}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <motion.div {...fade(0.3)} className="text-center py-20">
            <Building2 className="text-gray-600 mx-auto mb-4" size={48} />
            <p className="text-gray-400 text-lg font-medium mb-2">
              {departments.length === 0 ? "No Departments Yet" : "No departments match your search"}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              {departments.length === 0 
                ? "Create your first department to get started" 
                : "Try adjusting your search criteria"}
            </p>
            {departments.length === 0 && (
              <button 
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-colors"
              >
                <Plus size={18} />
                Create First Department
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F1629] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <Building2 className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {modalMode === "create" ? "Create Department" : "Edit Department"}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {modalMode === "create" ? "Add a new department to your organization" : "Update department information"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="text-gray-400" size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Department Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-[#1A2235] border ${formErrors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors`}
                      placeholder="e.g., Engineering"
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Department Code <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className={`w-full bg-[#1A2235] border ${formErrors.code ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors`}
                      placeholder="e.g., ENG"
                      maxLength={20}
                    />
                    {formErrors.code && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.code}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Brief description of the department..."
                    rows={3}
                  />
                </div>

                {/* Manager Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Manager Name
                    </label>
                    <input
                      type="text"
                      value={formData.manager_name}
                      onChange={(e) => setFormData({ ...formData, manager_name: e.target.value })}
                      className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="e.g., John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Manager Email
                    </label>
                    <input
                      type="email"
                      value={formData.manager_email}
                      onChange={(e) => setFormData({ ...formData, manager_email: e.target.value })}
                      className={`w-full bg-[#1A2235] border ${formErrors.manager_email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors`}
                      placeholder="e.g., john@company.com"
                    />
                    {formErrors.manager_email && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.manager_email}</p>
                    )}
                  </div>
                </div>

                {/* Budget & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Budget
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="e.g., $500K"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="e.g., New York"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#1A2235] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/50 text-white rounded-xl font-bold transition-colors"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {modalMode === "create" ? "Create Department" : "Save Changes"}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="px-5 py-3 bg-white/5 hover:bg-white/10 disabled:bg-white/5 text-gray-300 rounded-xl font-bold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


