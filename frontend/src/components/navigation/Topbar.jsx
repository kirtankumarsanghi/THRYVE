import { Bell, Search } from "lucide-react";

export default function Topbar() {
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
          className="w-full bg-[#0F172A] border border-[#1E2A4A] rounded-xl py-3 pl-11 pr-4 outline-none focus:border-[#8B7FFF]"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative bg-[#0F172A] p-3 rounded-xl border border-[#1E2A4A]">
          <Bell size={20} />

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-11 h-11 rounded-full"
          />

          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-400">
              Employee
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
