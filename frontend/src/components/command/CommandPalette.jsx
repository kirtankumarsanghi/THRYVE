import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, Target, Users, BarChart2, ShieldCheck, Calendar, CheckSquare } from "lucide-react";
import { animations } from "../../styles/animations";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands = useMemo(
    () => [
      { name: "Employee Dashboard", icon: LayoutDashboard, path: "/employee/dashboard" },
      { name: "My Goals", icon: Target, path: "/employee/goals" },
      { name: "Create New Goal", icon: Target, path: "/employee/goals/create" },
      { name: "Quarterly Check-ins", icon: CheckSquare, path: "/employee/checkins" },
      { name: "Manager Dashboard", icon: Users, path: "/manager/dashboard" },
      { name: "Manager Approvals", icon: CheckSquare, path: "/manager/approvals" },
      { name: "Organization Analytics", icon: BarChart2, path: "/admin/analytics" },
      { name: "Admin Hub", icon: ShieldCheck, path: "/admin/dashboard" },
      { name: "User Management", icon: Users, path: "/admin/users" },
      { name: "Review Cycles", icon: Calendar, path: "/admin/cycles" },
    ],
    []
  );

  const filteredCommands = useMemo(
    () => commands.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [commands, query]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery("");
  };

  const handleListNav = (e) => {
    if (!filteredCommands.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((v) => (v + 1) % filteredCommands.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((v) => (v - 1 + filteredCommands.length) % filteredCommands.length);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(filteredCommands[activeIndex].path);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
          <motion.button
            type="button"
            aria-label="Close command palette backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            {...animations.modalTransition}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl surface-card overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-border">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleListNav}
                aria-label="Command search input"
                className="w-full bg-transparent border-none px-4 py-4 text-white focus:outline-none placeholder:text-gray-500"
              />
              <kbd className="px-2 py-1 text-[10px] font-bold text-gray-500 uppercase bg-dark rounded border border-border">ESC</kbd>
            </div>
            <div role="listbox" aria-label="Command results" className="max-h-[340px] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, idx) => (
                  <button
                    key={command.path}
                    type="button"
                    role="option"
                    aria-selected={idx === activeIndex}
                    onClick={() => handleSelect(command.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      idx === activeIndex ? "bg-primary/15 text-primary" : "text-gray-300 hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <command.icon className="w-4 h-4" />
                    <span>{command.name}</span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No commands found.</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
