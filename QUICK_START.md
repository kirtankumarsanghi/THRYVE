# 🚀 Quick Start Guide - Thryve Application

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation & Setup

### 1. Install Dependencies
```bash
cd "d:\Kirtan Folder\thryve\frontend"
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will start at `http://localhost:5173`

## Testing Different Roles

### Method 1: Using Browser Console
Open the browser console (F12) and run:

```javascript
// Test as Employee
localStorage.setItem('role', 'employee');
window.location.href = '/';

// Test as Manager
localStorage.setItem('role', 'manager');
window.location.href = '/';

// Test as Admin
localStorage.setItem('role', 'admin');
window.location.href = '/';
```

### Method 2: Direct URL Navigation

**Employee Routes:**
- http://localhost:5173/employee/dashboard
- http://localhost:5173/employee/goals
- http://localhost:5173/employee/checkins
- http://localhost:5173/employee/progress
- http://localhost:5173/employee/notifications

**Manager Routes:**
- http://localhost:5173/manager/dashboard
- http://localhost:5173/manager/team
- http://localhost:5173/manager/approvals (shows 5 pending)
- http://localhost:5173/manager/checkins
- http://localhost:5173/manager/analytics
- http://localhost:5173/manager/notifications

**Admin Routes:**
- http://localhost:5173/admin/dashboard (Full dashboard with charts)
- http://localhost:5173/admin/users
- http://localhost:5173/admin/cycles
- http://localhost:5173/admin/audit
- http://localhost:5173/admin/reports
- http://localhost:5173/admin/governance

## Features to Test

### ✅ Layout Features
1. **Sidebar Navigation**
   - Click menu items to navigate
   - Active route is highlighted with colored left border
   - On mobile: Click hamburger menu to open sidebar
   - Click outside or X button to close

2. **Role Badges**
   - Employee: Blue badge
   - Manager: Purple badge
   - Admin: Red badge
   - Visible in both sidebar and top bar

3. **Responsive Design**
   - Resize browser window
   - Sidebar collapses on mobile (<768px)
   - Top bar adapts to screen size

### ✅ Admin Dashboard Features
1. **5 Stat Cards** (Top Row)
   - Total Employees: 156
   - Goals Submitted: 342
   - Pending Approvals: 23 (with red badge)
   - Check-in Completion: 87%
   - Active Review Cycle: Q3 2024

2. **Department Heatmap** (Left Column)
   - 6 departments × 4 quarters
   - Color coding:
     - Green: ≥90% completion
     - Yellow: 75-89% completion
     - Red: <75% completion
   - Hover over cells for details

3. **Audit Log** (Right Column)
   - Last 10 system activities
   - Color-coded actions
   - Scrollable list
   - Real-time timestamps

4. **Goal Status Chart** (Bottom)
   - Interactive donut chart
   - 5 status categories
   - Hover for tooltips
   - Legend with percentages

### ✅ Manager Features
1. **Pending Approvals Badge**
   - Shows count (5) on sidebar
   - Red notification badge
   - Glowing effect

2. **Approvals Page**
   - List of 5 pending items
   - Action buttons: Review, Approve, Reject
   - Employee details and timestamps

### ✅ Employee Features
1. **My Progress Page**
   - 4 stat cards
   - Performance chart placeholder
   - Quarterly metrics

2. **Notifications**
   - Unread notifications highlighted
   - Different notification types
   - Time stamps

## Visual Distinctions

### Color Themes by Role
- **Employee**: Blue (`#4cd7f6`) - Cyan/Turquoise
- **Manager**: Purple (`#ddb7ff`) - Lavender
- **Admin**: Red (`#ffb4ab`) - Coral Red

### Navigation Icons
All using Material Symbols Outlined:
- home, flag, calendar_today, show_chart, notifications
- groups, check_circle, assignment, bar_chart
- manage_accounts, calendar_month, shield, download, settings

## Troubleshooting

### Issue: Blank page or errors
**Solution**: Check browser console for errors
```bash
# Clear cache and restart
npm run dev
```

### Issue: Sidebar not showing
**Solution**: Check screen size - sidebar is hidden on mobile by default
- Click hamburger menu (☰) to open on mobile

### Issue: Charts not rendering
**Solution**: Ensure recharts is installed
```bash
npm install recharts
```

### Issue: Routes not working
**Solution**: Check localStorage role
```javascript
console.log(localStorage.getItem('role'));
```

## File Structure Overview

```
frontend/
├── src/
│   ├── layouts/
│   │   ├── EmployeeLayout.jsx    ← Blue theme
│   │   ├── ManagerLayout.jsx     ← Purple theme
│   │   └── AdminLayout.jsx       ← Red theme
│   ├── pages/
│   │   ├── employee/             ← Employee pages
│   │   ├── manager/              ← Manager pages
│   │   └── admin/                ← Admin pages
│   ├── routes/
│   │   └── AppRoutes.jsx         ← All routes defined
│   └── components/               ← Reusable components
├── package.json
└── tailwind.config.js            ← Design system colors
```

## Design System

### Colors (Tailwind Classes)
- `text-secondary` - Blue (#4cd7f6)
- `text-tertiary` - Purple (#ddb7ff)
- `text-error` - Red (#ffb4ab)
- `text-primary` - Main purple (#c0c1ff)
- `text-on-surface` - White text (#dce1fb)
- `text-on-surface-variant` - Gray text (#c7c4d7)

### Typography
- Headlines: `font-headline-lg` (Geist, 36px)
- Titles: `font-title-md` (Geist, 20px)
- Body: `font-body-sm` (Inter, 14px)
- Labels: `font-label-caps` (Geist, 12px, uppercase)

### Spacing
- Mobile padding: `px-margin-mobile` (16px)
- Desktop padding: `px-margin-desktop` (48px)
- Card padding: `p-6` (24px)

## Next Steps

1. **Test all routes** - Navigate through each role's pages
2. **Test responsive** - Resize browser to mobile/tablet/desktop
3. **Check interactions** - Click buttons, hover effects
4. **Verify charts** - Admin dashboard donut chart and heatmap
5. **Test navigation** - Sidebar, active states, logout

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Ensure you're on the correct route for your role
4. Check localStorage for role value

## Success Checklist

- [ ] Development server running
- [ ] Can navigate to all three role dashboards
- [ ] Sidebar opens/closes on mobile
- [ ] Role badges show correct colors
- [ ] Active routes are highlighted
- [ ] Manager's approval badge shows count
- [ ] Admin dashboard shows all 4 sections
- [ ] Charts render correctly
- [ ] Heatmap shows color coding
- [ ] Audit log is scrollable
- [ ] All pages are responsive

---

**Status**: ✅ All features implemented and ready for testing!
