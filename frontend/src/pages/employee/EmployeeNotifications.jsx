export default function EmployeeNotifications() {
  const notifications = [
    { id: 1, type: "goal", title: "Goal Updated", message: "Your Q3 goal 'Increase Revenue' has been updated", time: "2 hours ago", read: false },
    { id: 2, type: "checkin", title: "Check-in Reminder", message: "Quarterly check-in is due in 3 days", time: "5 hours ago", read: false },
    { id: 3, type: "achievement", title: "Achievement Unlocked", message: "You've completed 5 goals this quarter!", time: "1 day ago", read: true },
    { id: 4, type: "comment", title: "New Comment", message: "Your manager commented on your goal progress", time: "2 days ago", read: true },
    { id: 5, type: "approval", title: "Goal Approved", message: "Your Q3 goal 'Launch Enterprise Portal' has been approved", time: "3 days ago", read: true },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "goal": return "flag";
      case "checkin": return "calendar_today";
      case "achievement": return "emoji_events";
      case "comment": return "comment";
      case "approval": return "check_circle";
      default: return "notifications";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">notifications</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
            Updates & Alerts
          </span>
          {unreadCount > 0 && (
            <span className="min-w-[24px] h-6 px-2 flex items-center justify-center bg-error text-on-primary rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(255,180,171,0.5)]">
              {unreadCount}
            </span>
          )}
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Notifications
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Stay updated with your goals, check-ins, and achievements
        </p>
      </header>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-body-sm text-body-sm transition-all">
          Mark All as Read
        </button>
        <button className="px-4 py-2 bg-surface-variant/30 text-on-surface border border-outline-variant/20 hover:bg-surface-variant/50 rounded-lg font-body-sm text-body-sm transition-all">
          Clear Read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`bg-[#0F172A] border rounded-xl p-6 transition-all hover:border-primary/30 cursor-pointer ${
              notification.read ? 'border-white/5' : 'border-secondary/30 bg-secondary/5'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                notification.read ? 'bg-surface-variant' : 'bg-secondary/20'
              }`}>
                <span className={`material-symbols-outlined ${
                  notification.read ? 'text-on-surface-variant' : 'text-secondary'
                }`}>
                  {getIcon(notification.type)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-title-md text-body-base text-on-surface">{notification.title}</h3>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.5)]"></span>
                  )}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">{notification.message}</p>
                <span className="font-body-sm text-[12px] text-on-surface-variant">{notification.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
