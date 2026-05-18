import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Clock, Video, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { getEmployeeCalendar } from "../../api/employeeApi";

export default function Calendar() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  
  useEffect(() => {
    let active = true;
    const loadCalendar = async () => {
      try {
        setLoading(true);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const res = await getEmployeeCalendar(year, month);
        if (active) {
          setEvents(res?.events || []);
        }
      } catch (error) {
        console.error("Failed to load calendar events:", error);
        if (active) {
          setEvents([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadCalendar();
    return () => {
      active = false;
    };
  }, [currentDate]);

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startDay = new Date(year, monthIndex, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const eventsForMonth = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year &&
      eventDate.getMonth() === monthIndex
    );
  });

  const eventDays = new Set(
    eventsForMonth.map((event) => new Date(event.date).getDate())
  );

  const attendancePercent = Math.min(100, eventsForMonth.length * 10);

  const formatEventDate = (value) => {
    const eventDate = new Date(value);
    const today = new Date();
    const todayKey = today.toDateString();
    const eventKey = eventDate.toDateString();
    if (eventKey === todayKey) return "Today";
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (eventKey === tomorrow.toDateString()) return "Tomorrow";
    return eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const typeLabel = (type) => {
    switch (type) {
      case "goal_due":
        return "Goal";
      case "goal_completed":
        return "Complete";
      case "checkin_submitted":
        return "Check-in";
      case "checkin_window":
        return "Window";
      case "checkin_deadline":
        return "Deadline";
      default:
        return "Event";
    }
  };

  const badgeClass = (type) => {
    switch (type) {
      case "goal_due":
      case "checkin_deadline":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "goal_completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "checkin_submitted":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "checkin_window":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      default:
        return "bg-white/5 text-gray-400 border-white/10";
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

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
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Calendar</h1>
        <p className="text-gray-400">Manage your syncs, reviews, and high-performance cycles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Calendar Grid */}
        <div className="col-span-1 lg:col-span-2 bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CalendarIcon className="text-indigo-400" size={24} />
              {monthName} {year}
            </h2>
            <div className="flex gap-2">
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" onClick={handlePrevMonth}><ChevronLeft size={16} /></button>
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" onClick={handleNextMonth}><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 text-center text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startDay }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-24 rounded-xl border border-transparent"></div>
            ))}

            {daysArray.map((day) => {
              const isToday =
                day === new Date().getDate() &&
                monthIndex === new Date().getMonth() &&
                year === new Date().getFullYear();
              const hasEvent = eventDays.has(day);

              return (
                <div
                  key={day}
                  className={`relative h-24 rounded-xl border transition-all p-2 flex flex-col items-end cursor-pointer group ${
                    isToday ? "bg-indigo-500/10 border-indigo-500/30" :
                    hasEvent ? "bg-white/5 border-white/5 hover:border-white/20" :
                    "border-transparent hover:bg-white/5"
                  }`}
                >
                  <span className={`text-sm font-bold ${isToday ? "text-indigo-400" : "text-gray-400 group-hover:text-white"}`}>
                    {day}
                  </span>

                  {hasEvent && (
                    <div className="mt-auto w-full space-y-1">
                      <div className={`h-1.5 w-full rounded-full ${isToday ? "bg-indigo-500" : "bg-cyan-500/50"}`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          
          <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-6">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {eventsForMonth.map((event) => {
                const attendeeLabel = event.meta?.window
                  ? `${event.meta.window} window`
                  : event.meta?.goal_status
                  ? `Status: ${event.meta.goal_status}`
                  : "Thryve";
                const showVideo = event.type === "checkin_submitted";
                return (
                  <div key={event.id} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded border ${badgeClass(event.type)}`}>
                        {typeLabel(event.type)}
                      </span>
                      <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">{formatEventDate(event.date)}</span>
                    </div>
                    <h3 className="font-bold text-white mb-2">{event.title}</h3>
                    <div className="flex flex-col gap-2 text-xs text-gray-400">
                      <span className="flex items-center gap-2"><Clock size={14}/> All day</span>
                      <span className="flex items-center gap-2"><Users size={14}/> {attendeeLabel}</span>
                      {showVideo && <span className="flex items-center gap-2 text-indigo-400"><Video size={14}/> Video Call Link</span>}
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
              Schedule New Sync
            </button>
          </div>

          {/* Engagement Analytics */}
          <div className="bg-[#131B2F] border border-white/5 p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold text-white mb-4">Engagement Analytics</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#818CF8" strokeWidth="3" strokeDasharray={`${attendancePercent}, 100`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">{attendancePercent}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">Meeting Attendance</p>
                <p className="text-xs text-gray-400">Based on scheduled events this month.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
