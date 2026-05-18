import { useEffect, useMemo, useState } from "react";
import { Activity, Target, Award, Zap, BookOpen } from "lucide-react";
import { getEmployeeDevelopment } from "../../api/employeeApi";

export default function EmployeeDevelopment() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("employeeDevelopmentTab") || "Growth Plan";
  });
  const [objectiveFilter, setObjectiveFilter] = useState("all");

  const skills = useMemo(() => {
    const raw = data?.skills || [];
    const colors = ["text-cyan-400", "text-indigo-400", "text-purple-400"];
    const barColors = ["bg-cyan-400", "bg-indigo-500", "bg-purple-500"];
    return raw.map((skill, idx) => ({
      ...skill,
      textColor: colors[idx % colors.length],
      barColor: barColors[idx % barColors.length],
    }));
  }, [data]);

  const objectives = useMemo(() => {
    const raw = data?.objectives || [];
    return raw.map((obj, idx) => ({
      ...obj,
      icon: idx === 0 ? Target : idx === 1 ? Award : Zap,
    }));
  }, [data]);

  const filteredObjectives = useMemo(() => {
    if (objectiveFilter === "all") {
      return objectives;
    }
    const target = objectiveFilter.toLowerCase();
    return objectives.filter((obj) => (obj.status || "").toLowerCase() === target);
  }, [objectiveFilter, objectives]);

  const recommendations = data?.recommendations || [];
  const primaryRecommendation = recommendations[0];
  const secondaryRecommendations = recommendations.slice(1);
  const career = data?.career || {};

  const statusClassFor = (status) => {
    const normalized = (status || "").toLowerCase();
    if (normalized === "completed") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
    if (normalized === "on track") {
      return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    }
    if (normalized === "in progress") {
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
    return "bg-white/5 text-gray-400 border-white/10";
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getEmployeeDevelopment();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    localStorage.setItem("employeeDevelopmentTab", activeTab);
  }, [activeTab]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto min-h-screen text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">My Development</h1>
        <div className="flex gap-8 border-b border-white/10">
          {['Growth Plan', 'Skills', 'Certifications'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold transition-colors ${activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Growth Plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Skill Proficiency Matrix */}
          <div className="col-span-1 lg:col-span-3 bg-[#131B2F] border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-lg font-bold text-white">Skill Proficiency Matrix</h2>
                <p className="text-xs text-gray-400">Current state vs. Target trajectory</p>
              </div>
              <Activity className="text-indigo-400" size={20} />
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* Fake Radar Chart label area */}
              <div className="flex-1 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
                <div className="mb-2">Soft</div>
                <div className="mb-2">Skills</div>
                <div className="mb-2 text-white">LeadershipStrategy</div>
                <div>Technical</div>
              </div>

              {/* Progress bars */}
              <div className="flex-[2] space-y-8 w-full">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-white">{skill.name}</span>
                      <span className={skill.textColor}>{skill.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${skill.barColor} rounded-full`} style={{ width: `${skill.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Career Trajectory */}
          <div className="col-span-1 lg:col-span-2 bg-[#131B2F] border border-white/5 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-6">Career Trajectory</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/10">
              <div className="relative flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-4 border-indigo-500 bg-[#131B2F] z-10 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Current Role</p>
                  <p className="text-white font-bold">{career.current_role || "Employee"}</p>
                  <p className="text-xs text-gray-500 mt-1">Focused on scalable backend services</p>
                </div>
              </div>
              <div className="relative flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-4 border-white/10 bg-[#131B2F] z-10 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Next Milestone (Est. Q4)</p>
                  <p className="text-white font-bold">{career.next_milestone || "Growth Track"}</p>
                  <p className="text-xs text-gray-500 mt-1">Strategic infrastructure &amp; leadership</p>
                </div>
              </div>
              <div className="relative flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-4 border-white/10 bg-[#131B2F] z-10 flex-shrink-0"></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Future Path</p>
                  <p className="text-gray-500 font-bold">Leadership Impact</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm italic text-indigo-200">
              "{career.insight || "Define your first goal to unlock growth insights."}"
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Skills' && (
        <div className="bg-[#131B2F] border border-white/5 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Skills Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                  <span className={`text-2xl font-bold ${skill.textColor}`}>{skill.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                  <div className={`h-full ${skill.barColor} rounded-full`} style={{ width: `${skill.value}%` }}></div>
                </div>
                <p className="text-sm text-gray-400">Continue developing this skill through practice and training</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Certifications' && (
        <div className="bg-[#131B2F] border border-white/5 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Certifications & Training</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">AWS Solutions Architect</h3>
                <p className="text-sm text-gray-400">Completed: March 2024</p>
              </div>
              <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 text-sm font-bold rounded-lg border border-emerald-500/20">
                CERTIFIED
              </span>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">Leadership Training Program</h3>
                <p className="text-sm text-gray-400">In Progress - 60% Complete</p>
              </div>
              <div className="w-32">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">Advanced React Patterns</h3>
                <p className="text-sm text-gray-400">Recommended for you</p>
              </div>
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-lg transition-colors">
                ENROLL
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Growth Plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Objectives */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-3">
                Active Objectives 
                <span className="bg-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wider">{objectives.length} Active</span>
              </h3>
              <div className="flex gap-2">
                {["all", "on track", "completed"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setObjectiveFilter(filter)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-colors ${
                      objectiveFilter === filter
                        ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                        : "bg-[#131B2F] text-gray-400 hover:text-white border-white/5"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {filteredObjectives.length === 0 && (
                <div className="bg-[#131B2F] border border-white/5 p-5 rounded-2xl text-sm text-gray-400">
                  No objectives match this filter.
                </div>
              )}
              {filteredObjectives.map((obj) => (
                <div key={obj.id} className="bg-[#131B2F] border border-white/5 p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <obj.icon className="text-cyan-400" size={16} />
                      <span className="font-bold text-sm">{obj.title}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-md border ${statusClassFor(obj.status)}`}>{obj.status || "On Track"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${obj.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{obj.progress}% Complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">AI Recommendations</h3>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            <div className="space-y-4">
              {primaryRecommendation && (
                <div className="bg-[#131B2F] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
                  <div className="h-24 bg-gradient-to-r from-cyan-900/40 to-indigo-900/40 border-b border-white/5"></div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-2">Recommendation</p>
                    <h4 className="font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{primaryRecommendation.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{primaryRecommendation.detail}</p>
                  </div>
                </div>
              )}

              {secondaryRecommendations.map((rec) => (
                <div key={rec.id} className="bg-[#131B2F] border border-white/5 p-4 rounded-2xl flex gap-4 items-center group cursor-pointer shadow-xl">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex-shrink-0 border border-white/10"></div>
                  <div>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Development Focus</p>
                    <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors mb-1">{rec.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><BookOpen size={12}/> {rec.detail}</p>
                  </div>
                </div>
              ))}

              {!primaryRecommendation && (
                <div className="text-xs text-gray-500">No recommendations yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
