import { Award, Target, Zap, Clock, Star, Users, ArrowUpRight, Heart, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployeeAchievements } from "../../api/employeeApi";

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function Achievements() {
  const navigate = useNavigate();
  const [achievementData, setAchievementData] = useState(null);
  const [likesById, setLikesById] = useState({});

  useEffect(() => {
    let active = true;
    const fetchAchievements = async () => {
      try {
        const data = await getEmployeeAchievements();
        if (active) {
          setAchievementData(data);
        }
      } catch (error) {
        console.error("Failed to load achievements:", error);
      }
    };

    fetchAchievements();
    return () => {
      active = false;
    };
  }, []);

  const recognitions = useMemo(() => achievementData?.recognitions || [], [achievementData]);
  const milestones = useMemo(() => achievementData?.milestones || [], [achievementData]);

  const completionRate = achievementData?.completion_rate ?? 0;
  const overachievementRate = achievementData?.overachievement_rate ?? 0;
  const totalGoals = achievementData?.total_goals ?? 0;
  const completedGoalsCount = achievementData?.completed_goals ?? 0;
  const recognitionCount = recognitions.length;
  const impactScore = Math.min(10, Math.round((completionRate / 10) * 10) / 10);
  const rankPosition = achievementData?.rank?.position;

  const badges = useMemo(() => {
    const earnedMvp = completionRate >= 80;
    const earnedInnovation = overachievementRate >= 100;
    const earnedTenure = totalGoals >= 5;
    const earnedHypergrowth = completedGoalsCount >= 3;
    const earnedLegacy = completedGoalsCount >= 5;
    const earnedGlobal = completionRate >= 90;

    return [
      { id: "mvp", name: "Quarterly MVP", icon: Award, earned: earnedMvp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
      { id: "innovation", name: "Innovation Leader", icon: Zap, earned: earnedInnovation, color: "text-purple-400", bg: "bg-purple-500/10" },
      { id: "tenure", name: "Goal Builder", icon: Clock, earned: earnedTenure, color: "text-blue-400", bg: "bg-blue-500/10" },
      { id: "hypergrowth", name: "Hypergrowth Architect", icon: Target, earned: earnedHypergrowth, color: "text-slate-500", bg: "bg-slate-800" },
      { id: "legacy", name: "Legacy Builder", icon: Star, earned: earnedLegacy, color: "text-slate-500", bg: "bg-slate-800" },
      { id: "global", name: "Global Citizen", icon: Users, earned: earnedGlobal, color: "text-slate-500", bg: "bg-slate-800" },
    ];
  }, [completionRate, completedGoalsCount, overachievementRate, totalGoals]);

  const milestoneColors = ["bg-emerald-400", "bg-purple-400", "bg-pink-400"];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Achievements & Badges</h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Recognizing exceptional contributions and long-term commitment. Your path to professional excellence, quantified and celebrated.
          </p>
        </div>
        <div className="flex flex-col items-center bg-[#0B132C]/80 border border-white/5 rounded-2xl p-4 px-8 shadow-xl">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Global Rank</span>
          <span className="text-3xl font-bold text-white">#{rankPosition ?? "-"}</span>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1 */}
        <div className="bg-[#0B132C] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <ArrowUpRight className="absolute right-6 top-6 text-slate-700 opacity-20 w-24 h-24 group-hover:opacity-40 transition-opacity" />
          <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">Goals Over-Achieved</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-white tracking-tighter">{Math.round(overachievementRate)}%</span>
            <span className="text-sm font-semibold text-emerald-400 flex items-center">
              ↑ {Math.max(0, Math.round(overachievementRate - 100))}%
            </span>
          </div>
          <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(100, Math.max(0, Math.round(overachievementRate)))}%` }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#0B132C] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <Target className="absolute right-6 top-6 text-slate-700 opacity-20 w-24 h-24 group-hover:opacity-40 transition-opacity" />
          <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">Team Impact Score</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-cyan-400 tracking-tighter">{impactScore.toFixed(1)}</span>
            <span className="text-sm font-semibold text-slate-500">/ 10</span>
          </div>
          <p className="text-sm text-slate-400 mt-6">Completion rate: {Math.round(completionRate)}%</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#0B132C] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <Heart className="absolute right-6 top-6 text-slate-700 opacity-20 w-24 h-24 group-hover:opacity-40 transition-opacity" />
          <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-4">Total Recognitions</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-pink-400 tracking-tighter">{recognitionCount}</span>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex -space-x-2">
              <img src="https://i.pravatar.cc/150?u=1" alt="" className="w-8 h-8 rounded-full border-2 border-[#0B132C]" />
              <img src="https://i.pravatar.cc/150?u=2" alt="" className="w-8 h-8 rounded-full border-2 border-[#0B132C]" />
              <img src="https://i.pravatar.cc/150?u=3" alt="" className="w-8 h-8 rounded-full border-2 border-[#0B132C]" />
            </div>
            <span className="text-xs font-semibold text-slate-400 ml-3 bg-white/5 px-2 py-1 rounded-full">+28</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Gallery & Timeline) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Achievement Gallery */}
          <div className="bg-transparent rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award size={20} className="text-slate-400" /> Achievement Gallery
              </h2>
              <div className="flex bg-white/5 p-1 rounded-lg">
                <button className="px-4 py-1 text-xs font-semibold text-white bg-white/10 rounded-md">All</button>
                <button className="px-4 py-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors">Locked</button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div key={badge.id} className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all ${badge.earned ? 'bg-[#0B132C] border-white/5 hover:bg-[#101935]' : 'bg-transparent border-dashed border-white/10 opacity-60 grayscale'}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${badge.bg}`}>
                    <badge.icon size={28} className={badge.color} />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${badge.earned ? badge.color : 'text-slate-500'}`}>
                    {badge.earned ? 'Earned' : 'Locked'}
                  </span>
                  <p className="text-sm font-semibold text-white text-center">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Timeline */}
          <div className="bg-[#0B132C] border border-white/5 rounded-3xl p-8">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-8">
              <Zap size={20} className="text-cyan-400" /> Milestone Timeline
            </h2>
            
            <div className="relative border-l border-white/10 ml-3 space-y-10">
              {milestones.map((milestone, idx) => (
                <div key={milestone.id} className="relative pl-8">
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${milestoneColors[idx % milestoneColors.length]} shadow-[0_0_10px_currentColor]`} />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{formatDate(milestone.date)}</p>
                  <p className="text-base font-semibold text-white mb-2">{milestone.title}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="relative overflow-hidden rounded-3xl p-10 border border-white/10 group bg-[#040914]">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Cyber background" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" 
            />
            
            <div className="relative z-20 max-w-lg">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 border border-emerald-500/30">
                Career Milestone
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                You've completed {completedGoalsCount} goals at Thryve.
              </h2>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {completionRate >= 80
                  ? "Your completion rate places you among the top performers this cycle."
                  : "Keep momentum on active goals to boost your completion rate this cycle."}
              </p>
              <button
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                onClick={() => navigate("/employee/analytics")}
              >
                View Full Career Report <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Recognition Wall) */}
        <div className="lg:col-span-4">
          <div className="bg-transparent rounded-3xl h-full">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Users size={20} className="text-pink-400" /> Recognition Wall
            </h2>
            
            <div className="space-y-4">
              {recognitions.map((rec) => (
                <div key={rec.id} className="bg-[#0B132C] border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={rec.avatar || `https://i.pravatar.cc/150?u=${rec.id}`} alt={rec.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-sm font-bold text-white">{rec.author}</p>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{rec.role}</p>
                    </div>
                  </div>
                  
                  <div className="inline-block px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold text-purple-300 mb-4">
                    <Target size={10} className="inline mr-1" /> {rec.tag}
                  </div>
                  
                  <p className="text-sm text-slate-300 italic mb-6 leading-relaxed">
                    {rec.message || "Manager feedback"}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{rec.time}</span>
                    <button
                      className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
                      onClick={() =>
                        setLikesById((prev) => ({
                          ...prev,
                          [rec.id]: (prev[rec.id] ?? rec.likes ?? 0) + 1,
                        }))
                      }
                    >
                      <Heart size={14} /> {likesById[rec.id] ?? rec.likes ?? 0}
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                className="w-full py-4 text-sm font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-colors mt-2"
                onClick={() => navigate("/employee/feedback")}
              >
                View All Recognition
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
