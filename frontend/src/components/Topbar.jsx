import { Bell, Search, Menu } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-dark border-b border-border flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <button className="md:hidden text-gray-400 hover:text-white">
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 w-80 focus-within:border-primary/50 transition-colors">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search or type a command..."
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-dark"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-border pl-6 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm group-hover:bg-primary/30 transition-colors">
            JD
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">John Doe</p>
            <p className="text-xs text-gray-400">Engineering Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
