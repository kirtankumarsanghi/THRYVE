# Testing Guide - Admin Pages & Employee Feedback

## Quick Start

### 1. Start the Backend
```bash
cd backend
python -m uvicorn app.main:app --reload
```
Backend will run on: http://localhost:8000

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

---

## Test Admin Pages

### Login as Admin
1. Go to http://localhost:5173/login
2. Use admin credentials from your database
3. You should be redirected to `/admin/dashboard`

### Test Each Admin Page

#### ✅ Admin Dashboard (`/admin/dashboard`)
**What to check:**
- [ ] Page loads without errors
- [ ] "LIVE DATA" indicator shows (green pulsing dot)
- [ ] 4 metric cards display (Total Users, Departments, Pending Approvals, Completion Rate)
- [ ] System Health section shows stats
- [ ] Department Performance bar chart renders
- [ ] Top Performers list displays
- [ ] Authority Controls section works (role updates)
- [ ] Quarterly Windows section shows editable fields
- [ ] Admin Action Center displays (Bulk Role Updates, Approvals Queue, Escalation Log)
- [ ] Goal Status Distribution pie chart renders
- [ ] Recent Activity feed shows audit logs
- [ ] Quick Actions buttons navigate correctly
- [ ] Refresh button works (spinning animation)

#### ✅ User Management (`/admin/users`)
**What to check:**
- [ ] Page loads without errors
- [ ] Stats cards show (Total Users, Admins, Managers, Employees)
- [ ] Search box filters users
- [ ] Role filter dropdown works
- [ ] User table displays all users
- [ ] Role dropdown in table allows changing roles
- [ ] Status badges show correctly
- [ ] Refresh button works

#### ✅ Department Management (`/admin/departments`)
**What to check:**
- [ ] Page loads without errors
- [ ] Department cards display with stats
- [ ] "Add Department" button opens modal
- [ ] Create department form works
- [ ] Edit department button works
- [ ] Delete department shows confirmation
- [ ] Search/filter functionality works

#### ✅ Cycle Management (`/admin/cycles`)
**What to check:**
- [ ] Page loads without errors
- [ ] "SYSTEM LIVE" indicator shows
- [ ] Quarterly cycle table displays (Phase 1, Q1-Q4)
- [ ] Month inputs accept values 1-12
- [ ] Day inputs accept values 1-31
- [ ] "Save Configuration" button works
- [ ] Success toast appears after save

#### ✅ Governance Center (`/admin/governance`)
**What to check:**
- [ ] Page loads without errors
- [ ] Quarterly window configuration table displays
- [ ] Input fields are editable
- [ ] "Save Windows" button works
- [ ] Info card displays guidelines

#### ✅ Audit Logs (`/admin/audit`)
**What to check:**
- [ ] Page loads without errors
- [ ] Audit log entries display
- [ ] Filters work (action type, date range)
- [ ] Export functionality works
- [ ] Pagination works if many logs

#### ✅ Organization Analytics (`/admin/analytics`)
**What to check:**
- [ ] Page loads without errors
- [ ] Overview stats display (Total Goals, Completed, Pending, etc.)
- [ ] Department Performance section shows data
- [ ] Top Performers list displays
- [ ] Export CSV button works
- [ ] Refresh button works

---

## Test Employee Pages

### Login as Employee
1. Go to http://localhost:5173/login
2. Use employee credentials
3. You should be redirected to `/employee/dashboard`

### Test Feedback History

#### ✅ Feedback History (`/employee/feedback`)
**What to check:**
- [ ] Page loads without errors
- [ ] Header shows "Feedback History"
- [ ] Filter tabs display (All, Praise, Constructive)
- [ ] Activity feed shows sample feedback items:
  - [ ] Peer Review from "James Smith"
  - [ ] Manager 1:1 from "Alex Lee"
- [ ] Sentiment Trend chart displays (bar chart)
- [ ] Feedback Velocity card shows "4.2 events per month"
- [ ] Top Strengths section displays:
  - [ ] Technical Architecture (92%)
  - [ ] Mentorship (85%)
- [ ] Development Opportunities section shows "Cross-team Syncs"
- [ ] All UI elements render correctly

**Note:** This page uses **static demo data** by design. It's a UI mockup showing what the feedback system would look like.

---

## Common Issues & Solutions

### Issue: Page shows blank/white screen
**Solution:** 
- Check browser console for errors (F12)
- Verify backend is running
- Check network tab for failed API calls

### Issue: "Cannot read property of undefined"
**Solution:**
- Backend might not be returning expected data structure
- Check backend logs for errors
- Verify database has seed data

### Issue: Charts not rendering
**Solution:**
- Ensure recharts library is installed: `npm install recharts`
- Check if data is being fetched correctly
- Look for console errors

### Issue: Navigation not working
**Solution:**
- Verify routes in `App.jsx` match the navigation links
- Check if user has correct role permissions
- Clear browser cache and reload

---

## API Endpoints Being Used

### Admin Dashboard
- `GET /api/admin/system-health` - System health metrics
- `GET /api/admin/departments?include_stats=true` - Department data
- `GET /api/reports/quarterly-window` - Quarterly windows
- `GET /api/approvals/pending` - Pending approvals
- `GET /api/admin/escalations?status=open&limit=20` - Escalations

### User Management
- `GET /api/admin/users` - All users
- `PUT /api/admin/users/{id}/role` - Update user role

### Department Management
- `GET /api/admin/departments` - All departments
- `POST /api/admin/departments` - Create department
- `PUT /api/admin/departments/{id}` - Update department
- `DELETE /api/admin/departments/{id}` - Delete department

### Cycle Management
- `GET /api/reports/quarterly-window` - Get windows
- `POST /api/admin/quarterly-windows` - Update windows

### Organization Analytics
- `GET /api/analytics/org` - Organization metrics

### Employee Feedback
- **None** - Uses static demo data

---

## Success Criteria

### All Admin Pages Should:
✅ Load without JavaScript errors
✅ Display data from backend APIs
✅ Show loading states while fetching data
✅ Handle errors gracefully with toast notifications
✅ Allow navigation between pages
✅ Maintain responsive design on different screen sizes
✅ Show live data indicators where applicable

### Employee Feedback Should:
✅ Load without errors
✅ Display demo feedback data
✅ Show all UI sections (feed, charts, metrics)
✅ Render correctly on mobile and desktop

---

## Performance Checks

### Build Performance
```bash
cd frontend
npm run build
```
**Expected:** Build completes in ~20 seconds with no errors

### Bundle Size
- Main bundle: ~400KB (gzipped: ~130KB)
- Admin Dashboard: ~28KB (gzipped: ~6KB)
- Charts library: ~343KB (gzipped: ~103KB)

### Load Time
- Initial page load: < 2 seconds
- Navigation between pages: < 500ms
- API calls: < 1 second

---

## Browser Compatibility

Test in:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Safari (latest)

---

## Mobile Testing

Test responsive design:
- [ ] iPhone (375px width)
- [ ] iPad (768px width)
- [ ] Desktop (1920px width)

All admin pages should adapt layout for smaller screens.

---

## Deployment Testing

Before deploying:
1. Run `npm run build` - should complete without errors
2. Test production build locally: `npm run preview`
3. Verify all environment variables are set
4. Test with production API endpoints
5. Check CORS settings allow frontend domain

---

## Need Help?

If you encounter issues:
1. Check `FIXES_SUMMARY.md` for known issues
2. Review browser console for errors
3. Check backend logs for API errors
4. Verify database has seed data
5. Ensure all dependencies are installed

---

## Summary

✅ **2 admin pages fixed** (UserManagement, CycleManagement)
✅ **All admin pages verified working**
✅ **Employee feedback page working as designed**
✅ **Build completes successfully**
✅ **No diagnostic errors**

Ready for testing and deployment! 🚀
