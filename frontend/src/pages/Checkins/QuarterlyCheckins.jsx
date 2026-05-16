import React, { useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import DashboardCard from "../../components/dashboard/DashboardCard";
import EmptyState from "../../components/common/EmptyState";
import { checkins, goals } from "../../data/mockData";
import QuarterTabs from "../../components/checkins/QuarterTabs";
import ProgressUpdateCard from "../../components/checkins/ProgressUpdateCard";
import AchievementHistory from "../../components/checkins/AchievementHistory";
import { CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function QuarterlyCheckins() {
  const availableQuarters = checkins.map(c => c.quarter);
  const [activeQuarter, setActiveQuarter] = useState(availableQuarters[0] || "Q1");
  const quarterData = checkins.find((item) => item.quarter === activeQuarter);

  const handleManagerSignoff = (updateId) => {
    toast.success('Manager signoff recorded for update');
  };

  const handleReturnRework = (updateId) => {
    toast.success('Check-in returned to employee for rework');
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Quarterly Review & Check-ins"
        subtitle="Manage and sign-off on quarterly performance updates."
      />

      <DashboardCard className="mb-6">
        <QuarterTabs 
          quarters={availableQuarters} 
          activeQuarter={activeQuarter} 
          onSelect={setActiveQuarter} 
        />
      </DashboardCard>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <DashboardCard
          title="Progress Updates"
          subtitle={`Employee check-ins pending review for ${activeQuarter}`}
          className="xl:col-span-2"
        >
          {!quarterData ? (
            <EmptyState
              title="No updates pending"
              description="All check-ins for this quarter have been reviewed."
            />
          ) : (
            <div className="space-y-4">
              {quarterData.updates.map((update) => {
                const goal = goals.find((item) => item.id === update.goalId);
                return (
                  <div key={update.goalId} className="relative group">
                    <ProgressUpdateCard 
                      update={update} 
                      goalTitle={goal?.title} 
                      thrustArea={goal?.thrustArea} 
                    />
                    
                    {/* Manager Actions Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleManagerSignoff(update.goalId)}
                        className="bg-dark/80 hover:bg-dark text-emerald-400 p-2 rounded-lg border border-emerald-500/30 transition-colors"
                        title="Sign-off"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleReturnRework(update.goalId)}
                        className="bg-dark/80 hover:bg-dark text-amber-400 p-2 rounded-lg border border-amber-500/30 transition-colors"
                        title="Return for Rework"
                      >
                        <AlertCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DashboardCard>

        <DashboardCard title="Quarterly Milestones" subtitle="Historical timeline" className="xl:h-[600px] overflow-y-auto custom-scrollbar">
          <AchievementHistory goals={goals} />
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
