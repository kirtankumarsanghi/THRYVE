import { Bell, Search } from "lucide-react";

export default function Topbar({ userRole, userName, brandColor = "bg-[#8B7FFF]", brandText = "text-[#8B7FFF]", brandBorder = "border-[#1E2A4A]" }) {
  return (
    <header className="h-20 border-b border-[#1E2A4A] bg-[#101935]/70 backdrop-blur-xl flex items-center justify-between px-6">
      <div className="relative w-[350px]">
        <Search
          className="absolute left-4 top-3.5 text-gray-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search goals, analytics..."
          className={`w-full bg-[#0F172A] border border-[#1E2A4A] rounded-xl py-3 pl-11 pr-4 outline-none focus:border-opacity-50 transition-colors focus:${brandBorder}`}
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative bg-[#0F172A] p-3 rounded-xl border border-[#1E2A4A] hover:bg-[#1E2A4A]/50 transition-colors">
          <Bell size={20} className="text-gray-300" />
          <span className={`absolute top-1 right-1 w-2 h-2 ${brandColor} rounded-full`} />
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className={`w-11 h-11 rounded-full border-2 ${brandBorder}`}
          />

          <div>
            <p className="font-medium text-white">{userName || "User"}</p>
            <p className={`text-sm ${brandText} uppercase tracking-wider font-semibold text-[10px]`}>
              {userRole || "Employee"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
