import { useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import DashboardCard from "../../components/dashboard/DashboardCard";
import EmptyState from "../../components/common/EmptyState";
import { checkins, goals } from "../../data/mockData";
import QuarterTabs from "../../components/checkins/QuarterTabs";
import ProgressUpdateCard from "../../components/checkins/ProgressUpdateCard";
import AchievementHistory from "../../components/checkins/AchievementHistory";

export default function Checkins() {
  const availableQuarters = checkins.map(c => c.quarter);
  const [activeQuarter, setActiveQuarter] = useState(availableQuarters[0] || "Q1");
  const quarterData = checkins.find((item) => item.quarter === activeQuarter);

  return (
    <PageContainer>
      <SectionHeader
        title="Quarterly Check-ins"
        subtitle="Track planned vs actual outcomes with executive commentary"
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
          title="Quarterly Progress"
          subtitle={`Performance updates for ${activeQuarter}`}
          className="xl:col-span-2"
        >
          {!quarterData ? (
            <EmptyState
              title="No updates"
              description="Check-ins for this quarter will appear once updates are logged."
            />
          ) : (
            <div className="space-y-4">
              {quarterData.updates.map((update) => {
                const goal = goals.find((item) => item.id === update.goalId);
                return (
                  <ProgressUpdateCard 
                    key={update.goalId} 
                    update={update} 
                    goalTitle={goal?.title} 
                    thrustArea={goal?.thrustArea} 
                  />
                );
              })}
            </div>
          )}
        </DashboardCard>

        <DashboardCard title="Achievement Timeline" subtitle="Milestone history" className="xl:h-[600px] overflow-y-auto custom-scrollbar">
          <AchievementHistory goals={goals} />
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
