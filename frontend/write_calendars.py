import os

calendar_content = """import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Video, Users, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { getEmployeeCalendar } from "../../api/employeeApi";

export default function Calendar() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setEvents([
        { id: 1, title: "1:1 Bi-Weekly Sync", type: "1:1", time: "10:00 AM - 10:30 AM", attendee: "Alex Lee", date: "Today", isVideo: true },
        { id: 2, title: "Q3 High-Performance Cycle", type: "Review", time: "2:00 PM - 3:00 PM", attendee: "HR Team", date: "Tomorrow", isVideo: false },
        { id: 3, title: "Project Nebula Sync", type: "Sync", time: "11:00 AM - 12:00 PM", attendee: "Frontend Team", date: "Tomorrow", isVideo: true }
      ]);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Generate a mock calendar grid for the current month
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

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
              September 2026
            </h2>
            <div className="flex gap-2">
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><ChevronLeft size={16} /></button>
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 text-center text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Empty slots for starting day */}
            <div className="h-24 rounded-xl border border-transparent"></div>
            <div className="h-24 rounded-xl border border-transparent"></div>
            
            {/* Days */}
            {daysInMonth.map((day) => {
              const isToday = day === 15;
              const hasEvent = day === 15 || day === 16 || day === 22;
              
              return (
                <div 
                  key={day} 
                  className={`relative h-24 rounded-xl border transition-all p-2 flex flex-col items-end cursor-pointer group ${
                    isToday ? 'bg-indigo-500/10 border-indigo-500/30' : 
                    hasEvent ? 'bg-white/5 border-white/5 hover:border-white/20' : 
                    'border-transparent hover:bg-white/5'
                  }`}
                >
                  <span className={`text-sm font-bold ${isToday ? 'text-indigo-400' : 'text-gray-400 group-hover:text-white'}`}>
                    {day}
                  </span>
                  
                  {hasEvent && (
                    <div className="mt-auto w-full space-y-1">
                      <div className={`h-1.5 w-full rounded-full ${isToday ? 'bg-indigo-500' : 'bg-cyan-500/50'}`}></div>
                      {day === 15 && <div className="h-1.5 w-3/4 rounded-full bg-purple-500"></div>}
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
              {events.map((event) => (
                <div key={event.id} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded border ${
                      event.type === '1:1' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                      event.type === 'Review' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    }`}>
                      {event.type}
                    </span>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">{event.date}</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">{event.title}</h3>
                  <div className="flex flex-col gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-2"><Clock size={14}/> {event.time}</span>
                    <span className="flex items-center gap-2"><Users size={14}/> {event.attendee}</span>
                    {event.isVideo && <span className="flex items-center gap-2 text-indigo-400"><Video size={14}/> Video Call Link</span>}
                  </div>
                </div>
              ))}
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
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#818CF8" strokeWidth="3" strokeDasharray="85, 100" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">85%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">Meeting Attendance</p>
                <p className="text-xs text-gray-400">You are attending 85% of your scheduled team syncs.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
"""

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\employee\MyCalendar.jsx", "w", encoding="utf-8") as f:
    f.write(calendar_content)

with open(r"d:\Kirtan Folder\thryve\frontend\src\pages\manager\TeamCalendar.jsx", "w", encoding="utf-8") as f:
    f.write(calendar_content.replace("My Calendar", "Team Calendar").replace("MyCalendar", "TeamCalendar"))
