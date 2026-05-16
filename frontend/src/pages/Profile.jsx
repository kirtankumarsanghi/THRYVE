import PageContainer from "../components/common/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import DashboardCard from "../components/common/DashboardCard";
import { User } from "lucide-react";

export default function Profile() {
  return (
    <PageContainer>
      <SectionHeader 
        title="Your Profile" 
        subtitle="Manage your personal information and preferences."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard className="md:col-span-1 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
            <User size={40} />
          </div>
          <h3 className="text-xl font-semibold text-white">John Doe</h3>
          <p className="text-primary text-sm mb-4">Senior Engineer</p>
          <div className="w-full pt-4 border-t border-border/50">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Department</span>
              <span className="text-white">Engineering</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Manager</span>
              <span className="text-white">Sarah Jenkins</span>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard className="md:col-span-2">
          <h3 className="font-semibold text-lg text-white mb-4">Account Settings</h3>
          <p className="text-gray-400 text-sm">Settings panel configuration in progress.</p>
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
