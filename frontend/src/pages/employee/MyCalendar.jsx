import { useState, useEffect } from "react";
import { Calendar, Clock, Target, Video, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_EVENTS = [
  { id: 1, date: "2024-05-20", type: "meeting", title: "1-on-1 with Manager", time: "10:00 AM", duration: "30 min" },
  { id: 2, date: "2024-05-22", type: "checkin", title: "Q2 Check-in Due", time: "EOD", status: "pending" },
  { id: 3, date: "2024-05-23", type: "goal", title: "Goal Progress Update", time: "All Day" },
  { id: 4, date: "2024-05-25", type: "deadline", title: "Project Milestone", time: "5:00 PM", status: "upcoming" },
  { id: 5, date: "2024-05-27", type: "meeting", title: "Team Sync", time: "2:00 PM", duration: "45 min" },
];

const EVENT_TYPES = {
  meeting: { label: "Meeting", color: "blue", icon: Video },
  checkin: { label: "Check-in", color: "purple", icon: Calendar },
  goal: { label: "Goal", color: "emerald", icon: Target },
  deadline: { label: "Deadline", color: "orange", icon: AlertCircle },
};

export default function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setEvents(MOCK_EVENTS);
      setLoading(false);
    }, 800);
  }, []);

  const getWeekDates = () => {
    const curr = new Date(selectedDate);
    const first = curr.getDate() - curr.getDay();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(curr.setDate(first + i));
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const stats = {
    totalEvents: events.length,
    meetings: events.filter(e => e.type === "meeting").length,
    checkins: events.filter(e => e.type === "checkin").length,
    deadlines: events.filter(e => e.type === "deadline").length,
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-48"></div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl"></div>)}
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
          <h1 className="text-2xl font-bold text-white">My Calendar</h1>
          <p className="text-sm text-gray-400">Track your meetings, check-ins, and deadlines</p>
        </div>
        <button 
          onClick={goToToday}
          className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
        >
          Today
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/2 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Calendar className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Events</p>
              <p className="text-2xl font-bold text-white">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Video className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Meetings</p>
              <p className="text-2xl font-bold text-blue-400">{stats.meetings}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Target className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Check-ins</p>
              <p className="text-2xl font-bold text-purple-400">{stats.checkins}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <AlertCircle className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Deadlines</p>
              <p className="text-2xl font-bold text-orange-400">{stats.deadlines}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white/2 border border-white/5 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="text-gray-400" size={20} />
            </button>
            <h2 className="text-lg font-bold text-white">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={goToNextWeek}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="text-gray-400" size={20} />
            </button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-[200px] p-3 rounded-xl border transition-colors ${
                  isToday
                    ? "bg-blue-500/10 border-blue-500/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="text-center mb-3">
                  <p className="text-xs text-gray-400 uppercase">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className={`text-lg font-bold ${isToday ? "text-blue-400" : "text-white"}`}>
                    {date.getDate()}
                  </p>
                </div>

                <div className="space-y-2">
                  {dayEvents.map(event => {
                    const eventType = EVENT_TYPES[event.type];
                    const EventIcon = eventType.icon;
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-2 rounded-lg border cursor-pointer hover:scale-105 transition-transform bg-${eventType.color}-500/10 border-${eventType.color}-500/20`}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <EventIcon size={12} className={`text-${eventType.color}-400 mt-0.5 flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{event.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Clock size={10} />
                          {event.time}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white/2 border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map((event, index) => {
            const eventType = EVENT_TYPES[event.type];
            const EventIcon = eventType.icon;
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${eventType.color}-500/10 border border-${eventType.color}-500/20`}>
                    <EventIcon className={`text-${eventType.color}-400`} size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                      {event.duration && (
                        <>
                          <span>•</span>
                          <span>{event.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-${eventType.color}-500/10 text-${eventType.color}-400 border border-${eventType.color}-500/20`}>
                  <EventIcon size={12} />
                  {eventType.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
