import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, Target, Users, BarChart2, ShieldCheck, UserCircle, Calendar, CheckSquare } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { name: 'Go to Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'View My Goals', icon: Target, path: '/goals' },
    { name: 'Create New Goal', icon: Target, path: '/goals/create' },
    { name: 'Quarterly Check-ins', icon: CheckSquare, path: '/checkins' }, // Added to match routes
    { name: 'Team (Manager)', icon: Users, path: '/manager' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Admin Hub', icon: ShieldCheck, path: '/admin' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'Review Cycles', icon: Calendar, path: '/admin/cycles' },
  ];
  // Wait, I don't have CheckSquare imported. I'll fix imports.
  
  const filteredCommands = commands.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-card border border-border rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-border">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search... (Esc to close)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none px-4 py-4 text-white focus:outline-none placeholder:text-gray-500"
              />
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                <kbd className="px-2 py-1 bg-dark rounded border border-border">ESC</kbd>
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(command.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 hover:text-primary rounded-lg text-left text-gray-300 transition-colors"
                  >
                    <command.icon className="w-4 h-4" />
                    <span>{command.name}</span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No commands found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
