import { useState, useEffect } from "react";
import { Video, Calendar, Clock, Plus, CheckCircle2, AlertCircle, FileText, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_MEETINGS = [
  {
    id: 1,
    employee: "Alex Johnson",
    date: "2024-05-20",
    time: "10:00 AM",
    status: "scheduled",
    duration: "30 min",
    agenda: ["Q1 Performance Review", "Career Development", "Current Blockers"],
    lastMeeting: "2024-04-15",
    notes: "Discussed promotion path and skill development"
  },
  {
    id: 2,
    employee: "Priya Patel",
    date: "2024-05-18",
    time: "2:00 PM",
    status: "completed",
    duration: "45 min",
    agenda: ["Project Status", "Team Collaboration", "Work-Life Balance"],
    lastMeeting: "2024-04-10",
    notes: "Great progress on new feature. Needs more backend support."
  },
  {
    id: 3,
    employee: "Marcus Lee",
    date: "2024-05-22",
    time: "11:30 AM",
    status: "scheduled",
    duration: "30 min",
    agenda: ["Goal Progress", "Technical Challenges", "Training Needs"],
    lastMeeting: "2024-04-20",
    notes: "Interested in cloud architecture certification"
  },
  {
    id: 4,
    employee: "Sofia Garcia",
    date: "2024-05-15",
    time: "3:00 PM",
    status: "overdue",
    duration: "30 min",
    agenda: ["Performance Concerns", "Support Needed", "Goal Alignment"],
    lastMeeting: "2024-03-28",
    notes: "Struggling with new tech stack. Needs mentoring."
  },
];

const STATUS_CONFIG = {
  scheduled: { label: "Scheduled", color: "blue", icon: Calendar },
  completed: { label: "Completed", color: "emerald", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "red", icon: AlertCircle },
};

function Initials({ name }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-sm font-bold text-purple-300">
      {init}
    </div>
  );
}

export default function OneOnOnes() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMeetings(MOCK_MEETINGS);
      setLoading(false);
    }, 800);
  }, []);

  const filteredMeetings = meetings.filter(meeting => 
    filter === "all" || meeting.status === filter
  );

  const stats = {
    upcoming: meetings.filter(m => m.status === "scheduled").length,
    completed: meetings.filter(m => m.status === "completed").length,
    overdue: meetings.filter(m => m.status === "overdue").length,
  };

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
          <h1 className="text-2xl font-bold text-white">1-on-1 Meetings</h1>
          <p className="text-sm text-gray-400">Schedule and track individual meetings with your team</p>
        </div>
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors"
        >
          <Plus size={18} />
          Schedule Meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Calendar className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Upcoming</p>
              <p className="text-2xl font-bold text-blue-400">{stats.upcoming}</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="text-emerald-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed This Month</p>
              <p className="text-2xl font-bold text-emerald-400">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertCircle className="text-red-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Overdue</p>
              <p className="text-2xl font-bold text-red-400">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "scheduled", "completed", "overdue"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              filter === status
                ? "bg-purple-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {status === "all" ? "All Meetings" : STATUS_CONFIG[status]?.label}
          </button>
        ))}
      </div>

      {/* Meetings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMeetings.map((meeting, index) => {
          const statusConfig = STATUS_CONFIG[meeting.status];
          const StatusIcon = statusConfig.icon;
          
          return (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/2 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Initials name={meeting.employee} />
                  <div>
                    <h3 className="text-base font-semibold text-white">{meeting.employee}</h3>
                    <p className="text-xs text-gray-400">Last met: {meeting.lastMeeting}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-${statusConfig.color}-500/10 text-${statusConfig.color}-400 border border-${statusConfig.color}-500/20`}>
                  <StatusIcon size={12} />
                  {statusConfig.label}
                </span>
              </div>

              {/* Meeting Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar size={16} className="text-gray-500" />
                  <span>{meeting.date}</span>
                  <span className="text-gray-600">•</span>
                  <Clock size={16} className="text-gray-500" />
                  <span>{meeting.time}</span>
                  <span className="text-gray-600">•</span>
                  <span>{meeting.duration}</span>
                </div>

                {/* Agenda */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Agenda</p>
                  <ul className="space-y-1">
                    {meeting.agenda.map((item, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Last Notes */}
                {meeting.notes && (
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
                      <FileText size={12} />
                      Last Meeting Notes
                    </p>
                    <p className="text-sm text-gray-300">{meeting.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {meeting.status === "scheduled" && (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
                      <Video size={16} />
                      Join Meeting
                    </button>
                    <button className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors">
                      Reschedule
                    </button>
                  </>
                )}
                {meeting.status === "completed" && (
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors">
                    <FileText size={16} />
                    View Notes
                  </button>
                )}
                {meeting.status === "overdue" && (
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/20">
                    <Calendar size={16} />
                    Reschedule Now
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="text-center py-12 bg-white/2 border border-white/5 rounded-2xl">
          <Video className="mx-auto text-gray-500 mb-3" size={48} />
          <p className="text-gray-400">No meetings found</p>
        </div>
      )}
    </div>
  );
}
