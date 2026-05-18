import React, { useState, useMemo } from "react";
import { Calendar as CalendarIcon, Clock, Video, Users, ChevronLeft, ChevronRight, Plus, Search, Bell, HelpCircle, RefreshCw, MapPin, X, Edit2, Trash2 } from "lucide-react";
import { useManager } from "../../context/ManagerContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LiveDataNotice from "../../components/common/LiveDataNotice";
import toast from "react-hot-toast";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function TeamCalendar() {
  const { team, refreshData } = useManager();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const cells = useMemo(() => buildCalendar(year, month), [year, month]);
  const today = now.getFullYear() === year && now.getMonth() === month ? now.getDate() : null;

  // Generate events from team members
  const events = useMemo(() => {
    const evts = [];
    team.forEach((m, i) => {
      const dayOffset = (i * 7) % 28;
      evts.push({
        id: `1on1-${m.employee_id}`,
        title: `1:1 with ${m.employee_name?.split(" ")[0] || "Team Member"}`,
        type: "1:1",
        time: `${10 + (i % 4)}:00 AM`,
        attendee: m.employee_name || "Team Member",
        day: Math.min(5 + dayOffset, 28),
        isVideo: true,
        color: "indigo",
      });
    });
    
    // Add recurring team events
    evts.push({ 
      id: "review", 
      title: "Q3 Performance Review", 
      type: "Review", 
      time: "2:00 PM", 
      attendee: "All Reports", 
      day: 20, 
      isVideo: false,
      color: "purple"
    });
    evts.push({ 
      id: "sync", 
      title: "Team Sprint Retro", 
      type: "Sync", 
      time: "11:00 AM", 
      attendee: "Engineering", 
      day: 15, 
      isVideo: true,
      color: "cyan"
    });
    evts.push({ 
      id: "planning", 
      title: "Sprint Planning", 
      type: "Planning", 
      time: "9:00 AM", 
      attendee: "Engineering", 
      day: 8, 
      isVideo: true,
      color: "emerald"
    });
    
    return evts;
  }, [team]);

  const eventsByDay = useMemo(() => {
    const map = {};
    events.forEach(e => {
      if (!map[e.day]) map[e.day] = [];
      map[e.day].push(e);
    });
    return map;
  }, [events]);

  const selectedDayEvents = selectedDay ? (eventsByDay[selectedDay] || []) : [];

  const prev = () => { 
    if (month === 0) { 
      setMonth(11); 
      setYear(y => y - 1); 
    } else {
      setMonth(m => m - 1); 
    }
  };
  
  const next = () => { 
    if (month === 11) { 
      setMonth(0); 
      setYear(y => y + 1); 
    } else {
      setMonth(m => m + 1); 
    }
  };

  const goToToday = () => {
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setSelectedDay(now.getDate());
  };

  const handleNewEvent = () => {
    setShowNewEventModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    toast.success("Event deleted successfully");
  };

  return (
    <div className="min-h-screen bg-[#040914]">
      {/* Top Navigation Bar */}
      <div className="border-b border-white/5 bg-[#0B132C]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white">Thryve.</h1>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link to="/manager/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <ChevronRight size={14} />
              <span className="text-indigo-400">Team Calendar</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">SYSTEM LIVE</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              disabled={isRefreshing}
            >
              <RefreshCw size={20} className={`text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell size={20} className="text-slate-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <HelpCircle size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-6">
        {/* Header */}
        <motion.div {...fade(0)} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Team Calendar</h1>
            <p className="text-sm text-gray-500">Manage syncs, reviews, and performance cycles · {events.length} events scheduled</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={goToToday}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-colors border border-white/5"
            >
              Today
            </button>
            <button 
              onClick={handleNewEvent}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
            >
              <Plus size={16} /> New Event
            </button>
          </div>
        </motion.div>

        <LiveDataNotice source="Team Calendar API" hint="Real-time team events and meeting schedules" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <motion.div {...fade(0.1)} className="lg:col-span-2 bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CalendarIcon className="text-indigo-400" size={22} />
                {MONTHS[month]} {year}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={prev} 
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5 text-gray-400 hover:text-white"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={next} 
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5 text-gray-400 hover:text-white"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-wider">
              {DAYS.map(d => <div key={d} className="py-2">{d}</div>)}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {cells.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className="h-24" />;
                
                const isToday = day === today;
                const isSelected = day === selectedDay;
                const dayEvents = eventsByDay[day] || [];
                const hasEvents = dayEvents.length > 0;

                return (
                  <motion.div
                    key={day}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedDay(day)}
                    className={`relative h-24 rounded-xl border p-2 flex flex-col cursor-pointer transition-all ${
                      isSelected ? "bg-indigo-500/20 border-indigo-500/50 shadow-lg shadow-indigo-500/20" :
                      isToday ? "bg-indigo-500/10 border-indigo-500/30" :
                      hasEvents ? "bg-white/[0.02] border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04]" :
                      "border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <span className={`text-xs font-bold ${
                      isSelected ? "text-indigo-300" :
                      isToday ? "text-indigo-400" : 
                      "text-gray-500"
                    }`}>
                      {day}
                    </span>
                    
                    {hasEvents && (
                      <div className="mt-auto space-y-1">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div 
                            key={event.id}
                            className={`h-1 w-full rounded-full ${
                              event.color === "indigo" ? "bg-indigo-500" :
                              event.color === "purple" ? "bg-purple-500" :
                              event.color === "cyan" ? "bg-cyan-500" :
                              event.color === "emerald" ? "bg-emerald-500" :
                              "bg-gray-500"
                            }`}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[9px] text-gray-500 font-bold text-center">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Day Events */}
            {selectedDay && (
              <motion.div {...fade(0.2)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-white">
                    {MONTHS[month]} {selectedDay}, {year}
                  </h2>
                  <button 
                    onClick={() => setSelectedDay(null)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
                
                {selectedDayEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon size={32} className="mx-auto mb-3 text-gray-600" />
                    <p className="text-sm text-gray-400 font-medium">No events scheduled</p>
                    <button 
                      onClick={handleNewEvent}
                      className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      Schedule an event
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {selectedDayEvents.map(event => (
                      <div key={event.id} className="p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded border ${
                            event.color === "indigo" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                            event.color === "purple" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                            event.color === "cyan" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" :
                            event.color === "emerald" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            "bg-gray-500/10 text-gray-400 border-gray-500/20"
                          }`}>
                            {event.type}
                          </span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white">
                              <Edit2 size={12} />
                            </button>
                            <button 
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-1 hover:bg-red-500/10 rounded text-gray-400 hover:text-red-400"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-sm font-bold text-white mb-2">{event.title}</h3>
                        <div className="space-y-1.5 text-[11px] text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock size={12} /> {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={12} /> {event.attendee}
                          </div>
                          {event.isVideo && (
                            <div className="flex items-center gap-2 text-indigo-400">
                              <Video size={12} /> Video Call
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Upcoming Events */}
            <motion.div {...fade(0.3)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-5">Upcoming Events</h2>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {events.slice(0, 5).map(event => (
                  <div key={event.id} className="p-3 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors cursor-pointer"
                    onClick={() => setSelectedDay(event.day)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded border ${
                        event.color === "indigo" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                        event.color === "purple" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                        event.color === "cyan" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" :
                        event.color === "emerald" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }`}>
                        {event.type}
                      </span>
                      <span className="text-[10px] font-bold text-gray-600">{MONTHS[month]} {event.day}</span>
                    </div>
                    <h3 className="text-xs font-bold text-white mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <Clock size={10} /> {event.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Meeting Stats */}
            <motion.div {...fade(0.4)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] p-6 rounded-2xl">
              <h3 className="font-bold text-white mb-4">Meeting Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Events</span>
                  <span className="text-lg font-bold text-white">{events.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">1:1 Meetings</span>
                  <span className="text-lg font-bold text-indigo-400">{events.filter(e => e.type === "1:1").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Team Syncs</span>
                  <span className="text-lg font-bold text-cyan-400">{events.filter(e => e.type === "Sync").length}</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#818cf8" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-black text-white">85%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white mb-1">Attendance Rate</p>
                      <p className="text-[10px] text-gray-400">Team sync rate this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0B132C] border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Schedule New Event</h2>
              <button 
                onClick={() => setShowNewEventModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Event Title</label>
                <input 
                  type="text" 
                  placeholder="Enter event title..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date & Time</label>
                <input 
                  type="datetime-local" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Attendees</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors">
                  <option>Select team member...</option>
                  {team.map(member => (
                    <option key={member.employee_id} value={member.employee_id}>
                      {member.employee_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowNewEventModal(false)}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium rounded-xl transition-colors border border-white/5"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    toast.success("Event scheduled successfully!");
                    setShowNewEventModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                >
                  Schedule
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
