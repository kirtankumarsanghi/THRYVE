import PageContainer from "../components/common/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import DashboardCard from "../components/common/DashboardCard";
import { Calendar, CheckCircle, MessageSquare } from "lucide-react";

export default function Checkins() {
  const checkins = [
    { id: 1, title: "Q3 Mid-Quarter Review", date: "Aug 15, 2026", status: "Completed", manager: "Sarah Jenkins", comments: 3 },
    { id: 2, title: "Q3 Final Review", date: "Sep 30, 2026", status: "Upcoming", manager: "Sarah Jenkins", comments: 0 },
    { id: 3, title: "Q2 Final Review", date: "Jun 30, 2026", status: "Completed", manager: "Sarah Jenkins", comments: 5 },
  ];

  return (
    <PageContainer>
      <SectionHeader 
        title="Check-ins" 
        subtitle="Quarterly performance reviews and continuous feedback."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {checkins.map(checkin => (
            <DashboardCard key={checkin.id} className="hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${checkin.status === 'Completed' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-primary/10 text-primary'}`}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{checkin.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">Reviewer: {checkin.manager} • {checkin.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <MessageSquare size={14} />
                    <span>{checkin.comments}</span>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    checkin.status === 'Completed' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' : 'text-primary border-primary/20 bg-primary/10'
                  }`}>
                    {checkin.status}
                  </span>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
        
        <div className="space-y-6">
          <DashboardCard>
            <h3 className="font-semibold text-lg mb-4 text-white">Next Action Required</h3>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-center">
              <Calendar size={32} className="text-primary mx-auto mb-3" />
              <h4 className="font-medium text-white mb-2">Q3 Final Review Prep</h4>
              <p className="text-sm text-gray-400 mb-4">Prepare your self-assessment before Sep 25.</p>
              <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
                Start Draft
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </PageContainer>
  );
}
