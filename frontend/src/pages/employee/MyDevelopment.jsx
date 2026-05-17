import { useState, useEffect } from "react";
import { TrendingUp, Award, BookOpen, Target, Plus, CheckCircle2, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_DATA = {
  skills: [
    { id: 1, name: "React.js", level: 85, target: 90, category: "Technical" },
    { id: 2, name: "Leadership", level: 65, target: 80, category: "Soft Skills" },
    { id: 3, name: "Python", level: 70, target: 85, category: "Technical" },
    { id: 4, name: "Communication", level: 80, target: 90, category: "Soft Skills" },
    { id: 5, name: "Project Management", level: 60, target: 75, category: "Management" },
  ],
  learningPaths: [
    {
      id: 1,
      title: "Advanced React Patterns",
      progress: 65,
      modules: 8,
      completed: 5,
      estimatedTime: "12 hours",
      status: "in_progress"
    },
    {
      id: 2,
      title: "Leadership Fundamentals",
      progress: 30,
      modules: 10,
      completed: 3,
      estimatedTime: "20 hours",
      status: "in_progress"
    },
    {
      id: 3,
      title: "Cloud Architecture",
      progress: 0,
      modules: 15,
      completed: 0,
      estimatedTime: "30 hours",
      status: "not_started"
    },
  ],
  certifications: [
    { id: 1, name: "AWS Certified Developer", status: "completed", date: "2024-03-15", expiry: "2027-03-15" },
    { id: 2, name: "Scrum Master", status: "in_progress", progress: 75, expectedDate: "2024-06-30" },
    { id: 3, name: "React Advanced", status: "planned", startDate: "2024-07-01" },
  ],
  careerGoals: [
    { id: 1, title: "Become Senior Developer", progress: 60, deadline: "2024-12-31", milestones: 5, completed: 3 },
    { id: 2, title: "Lead a Project Team", progress: 40, deadline: "2025-03-31", milestones: 4, completed: 1 },
  ]
};

export default function MyDevelopment() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 800);
  }, []);

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

  const avgSkillLevel = Math.round(data.skills.reduce((acc, skill) => acc + skill.level, 0) / data.skills.length);
  const activeLearningPaths = data.learningPaths.filter(p => p.status === "in_progress").length;
  const completedCerts = data.certifications.filter(c => c.status === "completed").length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Development</h1>
        <p className="text-sm text-gray-400">Track your skills, learning paths, and career growth</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <TrendingUp className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Skill Level</p>
              <p className="text-2xl font-bold text-blue-400">{avgSkillLevel}%</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <BookOpen className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Learning</p>
              <p className="text-2xl font-bold text-purple-400">{activeLearningPaths}</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Award className="text-emerald-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Certifications</p>
              <p className="text-2xl font-bold text-emerald-400">{completedCerts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {["skills", "learning", "certifications", "career"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm transition-colors relative ${
              activeTab === tab ? "text-blue-400" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">My Skills</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors">
              <Plus size={16} />
              Add Skill
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/2 border border-white/5 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">{skill.name}</h3>
                    <p className="text-xs text-gray-400">{skill.category}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-lg border border-blue-500/20">
                    Level {skill.level}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Current</span>
                    <span className="text-white font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Target: {skill.target}%</span>
                    <span>{skill.target - skill.level}% to go</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Learning Paths Tab */}
      {activeTab === "learning" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Learning Paths</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors">
              <Plus size={16} />
              Enroll in Course
            </button>
          </div>

          <div className="space-y-4">
            {data.learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/2 border border-white/5 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{path.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{path.modules} modules</span>
                      <span>•</span>
                      <span>{path.estimatedTime}</span>
                      <span>•</span>
                      <span className={`font-semibold ${
                        path.status === "in_progress" ? "text-blue-400" :
                        path.status === "completed" ? "text-emerald-400" :
                        "text-gray-500"
                      }`}>
                        {path.status === "in_progress" ? "In Progress" :
                         path.status === "completed" ? "Completed" :
                         "Not Started"}
                      </span>
                    </div>
                  </div>
                  <div className="w-16 h-16 relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - path.progress / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{path.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {path.completed} of {path.modules} modules completed
                  </span>
                  <button className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium transition-colors border border-blue-500/20">
                    {path.status === "not_started" ? "Start Learning" : "Continue"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certifications Tab */}
      {activeTab === "certifications" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Certifications</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors">
              <Plus size={16} />
              Add Certification
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white/2 border rounded-2xl p-5 ${
                  cert.status === "completed" ? "border-emerald-500/20 bg-emerald-500/5" :
                  cert.status === "in_progress" ? "border-blue-500/20 bg-blue-500/5" :
                  "border-white/5"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    cert.status === "completed" ? "bg-emerald-500/10 border border-emerald-500/20" :
                    cert.status === "in_progress" ? "bg-blue-500/10 border border-blue-500/20" :
                    "bg-white/5 border border-white/10"
                  }`}>
                    {cert.status === "completed" ? <CheckCircle2 className="text-emerald-400" size={24} /> :
                     cert.status === "in_progress" ? <Clock className="text-blue-400" size={24} /> :
                     <Star className="text-gray-400" size={24} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">{cert.name}</h3>
                    {cert.status === "completed" && (
                      <p className="text-xs text-gray-400">
                        Earned: {cert.date} • Expires: {cert.expiry}
                      </p>
                    )}
                    {cert.status === "in_progress" && (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white font-semibold">{cert.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${cert.progress}%` }} />
                        </div>
                        <p className="text-xs text-gray-400">Expected: {cert.expectedDate}</p>
                      </div>
                    )}
                    {cert.status === "planned" && (
                      <p className="text-xs text-gray-400">Planned start: {cert.startDate}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Career Goals Tab */}
      {activeTab === "career" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Career Goals</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors">
              <Plus size={16} />
              Add Career Goal
            </button>
          </div>

          <div className="space-y-4">
            {data.careerGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/2 border border-white/5 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{goal.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Deadline: {goal.deadline}</span>
                      <span>•</span>
                      <span>Milestones: {goal.completed}/{goal.milestones}</span>
                    </div>
                  </div>
                  <Target className="text-blue-400" size={24} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-semibold">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
