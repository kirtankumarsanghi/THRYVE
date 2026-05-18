import { useEffect, useMemo, useState } from "react";
import { getTeamAnalytics } from "../../api/analyticsApi";
import { motion } from "framer-motion";
import { Calendar, Video, Clock, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { createMeeting, listMeetings, updateMeeting } from "../../api/meetingsApi";

const FALLBACK_STORAGE_KEY = "thryve_one_on_one_meetings";

function loadFallbackMeetings() {
  try {
    const raw = localStorage.getItem(FALLBACK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFallbackMeetings(meetings) {
  localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(meetings));
}

export default function OneOnOnes() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const [meetings, setMeetings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [meetingDateTime, setMeetingDateTime] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [useFallbackStorage, setUseFallbackStorage] = useState(false);

  const loadPageData = async () => {
    try {
      const [teamResult, meetingResult] = await Promise.allSettled([
        getTeamAnalytics(),
        listMeetings(),
      ]);

      if (teamResult.status === "fulfilled") {
        setTeam(Array.isArray(teamResult.value) ? teamResult.value : []);
      } else {
        console.error("Failed to load team data:", teamResult.reason);
        setTeam([]);
      }

      if (meetingResult.status === "fulfilled") {
        setUseFallbackStorage(false);
        setMeetings(Array.isArray(meetingResult.value) ? meetingResult.value : []);
      } else {
        const status = meetingResult.reason?.response?.status;
        if (status === 404) {
          setUseFallbackStorage(true);
          setMeetings(loadFallbackMeetings());
          toast("Backend meetings API not deployed yet. Using local schedule temporarily.");
        } else {
          throw meetingResult.reason;
        }
      }
    } catch (error) {
      console.error("Failed to load 1-on-1 data:", error);
      toast.error("Could not load 1-on-1 scheduling data.");
      setTeam([]);
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  const meetingsByEmployee = useMemo(() => {
    const map = new Map();
    for (const m of meetings) {
      if (!map.has(m.employee_id)) map.set(m.employee_id, []);
      map.get(m.employee_id).push(m);
    }
    for (const [key, list] of map.entries()) {
      list.sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));
      map.set(key, list);
    }
    return map;
  }, [meetings]);

  const meetingsThisWeek = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return meetings.filter((m) => {
      const d = new Date(m.starts_at);
      return d >= start && d < end;
    }).length;
  }, [meetings]);

  const openScheduleModal = (employeeId = "") => {
    const id = employeeId ? String(employeeId) : "";
    setSelectedEmployeeId(id);

    if (id) {
      const upcoming = meetings.find(
        (m) => String(m.employee_id) === id && new Date(m.starts_at) >= new Date(),
      );
      if (upcoming) {
        const local = new Date(upcoming.starts_at);
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        setMeetingDateTime(local.toISOString().slice(0, 16));
        setMeetingNotes(upcoming.notes || "");
      } else {
        setMeetingDateTime("");
        setMeetingNotes("");
      }
    } else {
      setMeetingDateTime("");
      setMeetingNotes("");
    }

    setIsModalOpen(true);
  };

  const closeScheduleModal = () => setIsModalOpen(false);

  const handleScheduleMeeting = async () => {
    if (!selectedEmployeeId) {
      toast.error("Select a team member first.");
      return;
    }
    if (!meetingDateTime) {
      toast.error("Select meeting date and time.");
      return;
    }

    const employeeId = Number(selectedEmployeeId);
    const employee = team.find((m) => Number(m.employee_id) === employeeId);
    if (!employee) {
      toast.error("Team member not found.");
      return;
    }

    const startsAt = new Date(meetingDateTime).toISOString();

    try {
      const existingUpcoming = meetings.find(
        (m) => Number(m.employee_id) === employeeId && new Date(m.starts_at) >= new Date(),
      );

      if (useFallbackStorage) {
        let updated;
        if (existingUpcoming) {
          updated = meetings.map((m) =>
            m.id === existingUpcoming.id ? { ...m, starts_at: startsAt, notes: meetingNotes } : m,
          );
          toast.success(`1-on-1 rescheduled with ${employee.employee_name}`);
        } else {
          updated = [
            {
              id: Date.now(),
              employee_id: employeeId,
              employee_name: employee.employee_name,
              starts_at: startsAt,
              notes: meetingNotes,
            },
            ...meetings,
          ];
          toast.success(`1-on-1 scheduled with ${employee.employee_name}`);
        }
        setMeetings(updated);
        saveFallbackMeetings(updated);
      } else {
        if (existingUpcoming) {
          await updateMeeting(existingUpcoming.id, {
            starts_at: startsAt,
            notes: meetingNotes,
          });
          toast.success(`1-on-1 rescheduled with ${employee.employee_name}`);
        } else {
          await createMeeting({
            employee_id: employeeId,
            starts_at: startsAt,
            notes: meetingNotes,
          });
          toast.success(`1-on-1 scheduled with ${employee.employee_name}`);
        }
        await loadPageData();
      }
      closeScheduleModal();
    } catch (error) {
      console.error("Failed to save meeting:", error);
      toast.error(error?.response?.data?.detail || "Failed to save meeting");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">1-on-1 Meetings</h1>
          <p className="text-sm text-gray-400">Manage and schedule weekly check-ins with your team members.</p>
        </div>
        <button
          onClick={() => openScheduleModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-purple-500/20"
        >
          <Calendar size={18} />
          Schedule New
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <Video className="text-purple-400" size={24} />
                <h2 className="text-lg font-bold text-white">Upcoming & Pending Check-ins</h2>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {team.map((m, idx) => {
                  const scheduled = meetingsByEmployee
                    .get(m.employee_id)
                    ?.find((x) => new Date(x.starts_at) >= new Date());

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={m.employee_id}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg flex-shrink-0">
                          {m.employee_name ? m.employee_name.split(" ").map((n) => n[0]).join("") : "U"}
                        </div>
                        <div>
                          <p className="text-white font-bold">{m.employee_name}</p>
                          <p className="text-xs text-purple-300 font-medium mb-1">{m.department}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            {scheduled ? (
                              <span className="flex items-center gap-1 text-emerald-300">
                                <Clock size={12} />
                                Scheduled: {new Date(scheduled.starts_at).toLocaleString()}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> Needs scheduling
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => toast("Notes are captured while scheduling")}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors border border-white/5"
                        >
                          <MessageSquare size={14} />
                          Notes
                        </button>
                        <button
                          type="button"
                          onClick={() => openScheduleModal(m.employee_id)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-xs font-bold transition-colors border border-purple-500/30"
                        >
                          {scheduled ? "Reschedule" : "Schedule"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}

                {team.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-400">No team members found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white mb-1">{meetingsThisWeek}</div>
                  <div className="text-sm text-gray-400">Meetings this week</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white mb-1">
                    {
                      team.filter(
                        (m) => !meetingsByEmployee.get(m.employee_id)?.some((x) => new Date(x.starts_at) >= new Date()),
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-400">Pending check-ins</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-2xl p-6 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Video className="text-purple-400" size={20} />
              </div>
              <h3 className="text-white font-bold mb-2">Shared Scheduling Enabled</h3>
              <p className="text-sm text-gray-300 mb-4">
                {useFallbackStorage
                  ? "Running in local fallback mode until backend meetings API is deployed."
                  : "Meetings are stored on the server and shared across sessions and devices."}
              </p>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeScheduleModal} aria-label="Close" />
          <div className="relative z-10 w-full max-w-lg bg-[#0B132C] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">Schedule 1-on-1</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Team Member</label>
                <select
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                >
                  <option value="">Select a team member</option>
                  {team.map((m) => (
                    <option key={m.employee_id} value={String(m.employee_id)}>
                      {m.employee_name} ({m.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  value={meetingDateTime}
                  onChange={(e) => setMeetingDateTime(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Notes (optional)</label>
                <textarea
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                  placeholder="Agenda, discussion points, blockers..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeScheduleModal} className="px-4 py-2 text-slate-300 hover:text-white">Cancel</button>
              <button onClick={handleScheduleMeeting} className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold">Save Meeting</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
