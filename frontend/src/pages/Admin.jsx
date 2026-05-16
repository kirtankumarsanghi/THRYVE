import PageContainer from "../components/common/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import DashboardCard from "../components/common/DashboardCard";

export default function Admin() {
  return (
    <PageContainer>
      <SectionHeader 
        title="Admin Console" 
        subtitle="Manage users, system settings, and global OKRs."
      />
      <DashboardCard>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-red-400/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-red-400 font-bold">A</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Restricted Access</h3>
          <p className="text-gray-400 max-w-md">You are viewing the admin console. Full administrative controls and audit logs are being configured.</p>
        </div>
      </DashboardCard>
    </PageContainer>
  );
}
