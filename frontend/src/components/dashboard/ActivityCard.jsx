import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function ActivityCard({ activity }) {
  const getIcon = (type) => {
    switch(type) {
      case 'update': return <RefreshCw size={16} className="text-cyan-400" />;
      case 'achievement': return <CheckCircle2 size={16} className="text-emerald-400" />;
      case 'checkin': return <AlertCircle size={16} className="text-primary" />;
      default: return <RefreshCw size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex items-start gap-4 p-3 hover:bg-card/40 rounded-xl transition-colors cursor-default">
      <div className="mt-1 p-1.5 bg-dark/50 rounded-full border border-border/50">
        {getIcon(activity.type)}
      </div>
      <div className="flex-1 border-b border-border/30 pb-3">
        <p className="text-sm text-gray-200 leading-snug">{activity.text}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
}
