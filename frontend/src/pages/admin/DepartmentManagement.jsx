import { useState, useEffect } from "react";
import { Users, Plus, Edit2, Trash2, Building2, TrendingUp, Target, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_DEPARTMENTS = [
  {
    id: 1,
    name: "Engineering",
    manager: "Sarah Johnson",
    employees: 24,
    avgPerformance: 85,
    goalsCompleted: 45,
    totalGoals: 52,
    budget: "$2.4M"
  },
  {
    id: 2,
    name: "Product",
    manager: "Michael Chen",
    employees: 12,
    avgPerformance: 78,
    goalsCompleted: 28,
    totalGoals: 35,
    budget: "$1.2M"
  },
  {
    id: 3,
    name: "Design",
    manager: "Emily Rodriguez",
    employees: 8,
    avgPerformance: 92,
    goalsCompleted: 18,
    totalGoals: 20,
    budget: "$800K"
  },
  {
    id: 4,
    name: "Marketing",
    manager: "David Kim",
    employees: 15,
    avgPerformance: 75,
    goalsCompleted: 32,
    totalGoals: 45,
    budget: "$1.5M"
  },
  {
    id: 5,
    name: "Sales",
    manager: "Lisa Anderson",
    employees: 20,
    avgPerformance: 88,
    goalsCompleted: 56,
    totalGoals: 60,
    budget: "$1.8M"
  },
];

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDepartments(MOCK_DEPARTMENTS);
      setLoading(false);
    }, 800);
  }, []);

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employees, 0);
  const avgOrgPerformance = Math.round(
    departments.reduce((sum, dept) => sum + dept.avgPerformance, 0) / departments.length
  );

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-48"></div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl"></div>)}
        </div>
        <div className="h-96 bg-white/5 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Department Management</h1>
          <p className="text-sm text-gray-400">Manage departments, teams, and organizational structure</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <Building2 className="text-red-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Departments</p>
              <p className="text-2xl font-bold text-white">{departments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Users className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Employees</p>
              <p className="text-2xl font-bold text-blue-400">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="text-emerald-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Performance</p>
              <p className="text-2xl font-bold text-emerald-400">{avgOrgPerformance}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/2 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <Building2 className="text-red-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{dept.name}</h3>
                  <p className="text-sm text-gray-400">Manager: {dept.manager}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Edit2 className="text-gray-400 hover:text-white" size={16} />
                </button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 className="text-gray-400 hover:text-red-400" size={16} />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={14} className="text-blue-400" />
                  <span className="text-xs text-gray-400">Employees</span>
                </div>
                <p className="text-xl font-bold text-white">{dept.employees}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-emerald-400" />
                  <span className="text-xs text-gray-400">Performance</span>
                </div>
                <p className="text-xl font-bold text-emerald-400">{dept.avgPerformance}%</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target size={14} className="text-purple-400" />
                  <span className="text-xs text-gray-400">Goals</span>
                </div>
                <p className="text-xl font-bold text-white">{dept.goalsCompleted}/{dept.totalGoals}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Award size={14} className="text-yellow-400" />
                  <span className="text-xs text-gray-400">Budget</span>
                </div>
                <p className="text-xl font-bold text-white">{dept.budget}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Goal Completion</span>
                <span className="text-white font-semibold">
                  {Math.round((dept.goalsCompleted / dept.totalGoals) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(dept.goalsCompleted / dept.totalGoals) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-red-500 rounded-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
