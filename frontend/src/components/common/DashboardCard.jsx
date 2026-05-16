export default function DashboardCard({ children, className = "" }) {
  return (
    <div className={`bg-card/40 backdrop-blur-md border border-border/60 rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
}
