# 🧪 THRYVE - Comprehensive Testing Guide

## Complete Testing Checklist for Phase 4 & 5

---

## 🚀 Pre-Testing Setup

### 1. Start Backend
```bash
cd backend
python seed_demo_data.py  # Only run once
python -m uvicorn app.main:app --reload
```
✅ Backend running on `http://127.0.0.1:8000`

### 2. Start Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend running on `http://localhost:5173`

### 3. Verify API Documentation
Open: `http://127.0.0.1:8000/docs`
✅ Swagger UI should load with all endpoints

---

## 🔐 Authentication Tests

### Test 1.1: Employee Login
**Steps:**
1. Go to `http://localhost:5173/login`
2. Enter: `employee@thryve.com` / `employee123`
3. Click "Sign In"

**Expected:**
- ✅ Redirects to `/employee/dashboard`
- ✅ Success toast appears
- ✅ Dashboard shows real data
- ✅ JWT token in localStorage
- ✅ User data in localStorage

**Verify:**
```javascript
// Open browser console
localStorage.getItem('token')  // Should show JWT
localStorage.getItem('user')   // Should show user object
```

### Test 1.2: Manager Login
**Steps:**
1. Logout (if logged in)
2. Login with: `manager@thryve.com` / `manager123`

**Expected:**
- ✅ Redirects to `/manager/dashboard`
- ✅ Manager-specific menu items visible
- ✅ Can access `/manager/approvals`

### Test 1.3: Admin Login
**Steps:**
1. Logout
2. Login with: `admin@thryve.com` / `admin123`

**Expected:**
- ✅ Redirects to `/admin/dashboard`
- ✅ Admin menu items visible
- ✅ Can access `/admin/governance`

### Test 1.4: Invalid Login
**Steps:**
1. Try login with: `wrong@email.com` / `wrongpass`

**Expected:**
- ✅ Error toast appears
- ✅ Stays on login page
- ✅ No token stored

### Test 1.5: Token Expiration
**Steps:**
1. Login successfully
2. In browser console: `localStorage.setItem('token', 'invalid-token')`
3. Refresh page or make API call

**Expected:**
- ✅ Redirects to login
- ✅ Token cleared from localStorage

---

## 🎯 Goal Management Tests

### Test 2.1: View Goals
**Steps:**
1. Login as employee
2. Go to "Goals" page

**Expected:**
- ✅ Shows list of goals from database
- ✅ Each goal shows: title, progress, status, quarter
- ✅ No mock data
- ✅ Loading state appears first

**Verify in Network Tab:**
- ✅ GET request to `/goals`
- ✅ JWT token in Authorization header
- ✅ Response contains goal array

### Test 2.2: Create Goal
**Steps:**
1. Login as employee
2. Go to "Goals" → "Create Goal"
3. Fill form:
   - Title: "Test Goal"
   - Description: "Testing goal creation"
   - Strategic Area: "Revenue Growth"
   - Target Value: 100
   - Weightage: 20
   - UOM Type: Min
   - Quarter: Q1
4. Click "Create Goal"

**Expected:**
- ✅ Success toast appears
- ✅ Redirects to goals list
- ✅ New goal appears in list
- ✅ Goal status: "pending"
- ✅ Approval status: "pending"

**Verify in Network Tab:**
- ✅ POST request to `/goals`
- ✅ Request body contains goal data
- ✅ Response contains created goal with ID

**Verify in Backend:**
```bash
# Check audit log was created
sqlite3 backend/thryve.db
SELECT * FROM audit_logs WHERE action='goal_created' ORDER BY id DESC LIMIT 1;
```

### Test 2.3: Update Goal
**Steps:**
1. Click on a pending goal
2. Click "Edit"
3. Change title to "Updated Goal"
4. Click "Save"

**Expected:**
- ✅ Success toast appears
- ✅ Goal title updated in list
- ✅ Audit log created

**Verify:**
- ✅ PUT request to `/goals/{id}`
- ✅ Audit log shows old and new values

### Test 2.4: Weightage Validation
**Steps:**
1. Try to create goal with weightage < 10

**Expected:**
- ✅ Error toast: "Minimum weightage per goal is 10%"

**Steps:**
2. Create goals until total weightage > 100

**Expected:**
- ✅ Error toast: "Total goal weightage would be X%. Cannot exceed 100%."

### Test 2.5: Locked Goal Edit
**Steps:**
1. Login as manager
2. Approve a goal
3. Logout, login as employee
4. Try to edit the approved goal

**Expected:**
- ✅ Error message: "Goal is locked and cannot be edited"
- ✅ Edit button disabled or hidden

---

## ✅ Approval Workflow Tests

### Test 3.1: View Pending Approvals
**Steps:**
1. Login as manager
2. Go to "Approvals"

**Expected:**
- ✅ Shows list of pending goals
- ✅ Each goal shows employee name, department
- ✅ Approve/Reject buttons visible

**Verify:**
- ✅ GET request to `/approvals/pending`
- ✅ Response contains goals with employee data

### Test 3.2: Approve Goal
**Steps:**
1. On pending approval, click "Approve"
2. Add comment: "Looks good!"
3. Confirm

**Expected:**
- ✅ Success toast appears
- ✅ Goal disappears from pending list
- ✅ Audit log created

**Verify in Database:**
```sql
SELECT * FROM goals WHERE id=<goal_id>;
-- approval_status should be 'approved'
-- is_locked should be 1 (true)
-- manager_comment should be 'Looks good!'

SELECT * FROM audit_logs WHERE action='goal_approved' ORDER BY id DESC LIMIT 1;
-- Should show the approval action
```

### Test 3.3: Reject Goal
**Steps:**
1. Click "Reject" on a pending goal
2. Add comment: "Please revise target"
3. Confirm

**Expected:**
- ✅ Success toast appears
- ✅ Goal disappears from pending
- ✅ Goal stays unlocked (is_locked = false)

**Verify:**
- ✅ PUT request to `/approvals/{id}/reject`
- ✅ Audit log created with action='goal_rejected'

### Test 3.4: Employee Sees Rejection
**Steps:**
1. Logout, login as employee
2. View goals list

**Expected:**
- ✅ Rejected goal shows status "rejected"
- ✅ Manager comment visible
- ✅ Goal is editable (not locked)

---

## 📊 Check-in Tests

### Test 4.1: Submit Check-in
**Steps:**
1. Login as employee
2. Go to "Check-ins"
3. Select an approved goal
4. Fill check-in form:
   - Quarter: Q1
   - Planned Value: 25
   - Achieved Value: 20
   - Comment: "Good progress"
5. Submit

**Expected:**
- ✅ Success toast appears
- ✅ Goal progress updates
- ✅ Goal status changes to "in_progress"
- ✅ Audit log created

**Verify:**
- ✅ POST request to `/checkins/{goal_id}`
- ✅ Goal achieved_value updated
- ✅ Progress percentage calculated

### Test 4.2: Check-in on Locked Goal
**Steps:**
1. Try to submit check-in on approved goal

**Expected:**
- ✅ Check-in form available (locked goals can have check-ins)
- ✅ Check-in submits successfully

### Test 4.3: Check-in on Pending Goal
**Steps:**
1. Try to submit check-in on pending goal

**Expected:**
- ✅ Error: "Goal must be approved first"
- OR check-in disabled for pending goals

---

## 📈 Analytics Tests

### Test 5.1: Organization Overview
**Steps:**
1. Login as any role
2. Go to "Analytics" or view dashboard

**Expected:**
- ✅ Shows real metrics from database:
  - Total goals
  - Completed goals
  - Pending goals
  - Average progress
  - Completion rate
- ✅ Numbers match database counts

**Verify:**
- ✅ GET request to `/analytics/overview`
- ✅ Response contains calculated metrics

**Manual Verification:**
```sql
-- Count total goals
SELECT COUNT(*) FROM goals;

-- Count completed goals
SELECT COUNT(*) FROM goals WHERE status='completed';

-- Calculate completion rate
SELECT 
  (COUNT(CASE WHEN status='completed' THEN 1 END) * 100.0 / COUNT(*)) as completion_rate
FROM goals;
```

### Test 5.2: Team Analytics
**Steps:**
1. Login as manager or admin
2. Go to "Analytics" → "Team Performance"

**Expected:**
- ✅ Shows list of employees
- ✅ Each employee shows:
  - Total goals
  - Completed goals
  - Completion rate
  - Average progress
- ✅ Sorted by completion rate

**Verify:**
- ✅ GET request to `/analytics/team`
- ✅ Data matches database

### Test 5.3: Quarterly Trends
**Steps:**
1. View quarterly trends chart

**Expected:**
- ✅ Shows data for Q1, Q2, Q3, Q4
- ✅ Line chart displays properly
- ✅ Completion rates calculated correctly

**Verify:**
- ✅ GET request to `/analytics/trends`
- ✅ Response has arrays for each quarter

### Test 5.4: Employee Rankings
**Steps:**
1. View employee leaderboard

**Expected:**
- ✅ Shows top 10 employees
- ✅ Ranked by completion rate
- ✅ Shows rank, name, department, metrics

**Verify:**
- ✅ GET request to `/analytics/rankings?limit=10`

---

## 👑 Admin Tests

### Test 6.1: System Health
**Steps:**
1. Login as admin
2. Go to "Admin" → "Dashboard"

**Expected:**
- ✅ Shows system health metrics:
  - Total users
  - Active users
  - Total goals
  - Locked goals
  - Pending approvals
  - Recent audit count
  - Status (healthy/attention_needed)

**Verify:**
- ✅ GET request to `/admin/system-health`

### Test 6.2: Unlock Goal
**Steps:**
1. Go to "Admin" → "Governance"
2. Find a locked goal
3. Click "Unlock"
4. Enter reason: "Business requirement changed"
5. Confirm

**Expected:**
- ✅ Success toast appears
- ✅ Goal is unlocked (is_locked = false)
- ✅ Audit log created with action='goal_unlocked'

**Verify:**
- ✅ PUT request to `/admin/goals/{id}/unlock`
- ✅ Goal can now be edited by employee

### Test 6.3: View Audit Logs
**Steps:**
1. Go to "Admin" → "Audit Logs"

**Expected:**
- ✅ Shows list of all audit logs
- ✅ Each log shows:
  - User email
  - Action
  - Target
  - Timestamp
  - Details
- ✅ Can filter by user, action, date

**Verify:**
- ✅ GET request to `/admin/audit-logs`
- ✅ Pagination works

### Test 6.4: Export CSV
**Steps:**
1. Go to "Admin" → "Reports"
2. Click "Export Goals"
3. Select filters (optional)
4. Click "Download"

**Expected:**
- ✅ CSV file downloads
- ✅ File contains goal data
- ✅ Columns match schema

**Verify:**
- ✅ GET request to `/admin/export/goals`
- ✅ Response type: text/csv
- ✅ File opens in Excel/Sheets

### Test 6.5: Change User Role
**Steps:**
1. Go to "Admin" → "Users"
2. Select a user
3. Change role from "employee" to "manager"
4. Save

**Expected:**
- ✅ Success toast appears
- ✅ User role updated
- ✅ Audit log created

**Verify:**
- ✅ PUT request to `/admin/users/{id}/role`
- ✅ User can now access manager features

---

## 🔍 Audit Trail Tests

### Test 7.1: Goal History
**Steps:**
1. Login as any role
2. View a goal that has been created, approved, and updated
3. Click "View History" or "Audit Trail"

**Expected:**
- ✅ Shows complete history:
  - Goal created
  - Goal approved
  - Check-ins submitted
  - Any updates
- ✅ Each entry shows user, action, timestamp

**Verify:**
- ✅ GET request to `/audit/goal/{id}/history`

### Test 7.2: My Activity
**Steps:**
1. Login as employee
2. Go to "Profile" → "My Activity"

**Expected:**
- ✅ Shows user's own actions
- ✅ Filtered to current user only

**Verify:**
- ✅ GET request to `/audit/logs`
- ✅ Only shows current user's logs

### Test 7.3: Team Activity (Manager)
**Steps:**
1. Login as manager
2. Go to "Team" → "Activity"

**Expected:**
- ✅ Shows team member activities
- ✅ Can filter by user

**Verify:**
- ✅ GET request to `/audit/team-logs`

---

## 🔒 Security Tests

### Test 8.1: Role-Based Access
**Steps:**
1. Login as employee
2. Try to access `/manager/approvals` directly

**Expected:**
- ✅ Redirects to `/employee/dashboard`
- ✅ Cannot access manager routes

**Steps:**
2. Try to access `/admin/governance`

**Expected:**
- ✅ Redirects to `/employee/dashboard`
- ✅ Cannot access admin routes

### Test 8.2: API Authorization
**Steps:**
1. Login as employee
2. Open browser console
3. Try to call admin endpoint:
```javascript
fetch('http://127.0.0.1:8000/admin/system-health', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
```

**Expected:**
- ✅ Returns 403 Forbidden
- ✅ Error message: "Admin role required"

### Test 8.3: Token Validation
**Steps:**
1. Modify token in localStorage to invalid value
2. Try to make API call

**Expected:**
- ✅ Returns 401 Unauthorized
- ✅ Redirects to login
- ✅ Token cleared

---

## 🎨 UI/UX Tests

### Test 9.1: Loading States
**Steps:**
1. Login and navigate to dashboard
2. Observe loading states

**Expected:**
- ✅ Loading spinner shows while fetching data
- ✅ Skeleton loaders for cards/charts
- ✅ Smooth transition to loaded state

### Test 9.2: Toast Notifications
**Steps:**
1. Perform various actions (create goal, approve, etc.)

**Expected:**
- ✅ Success toasts are green
- ✅ Error toasts are red
- ✅ Toasts auto-dismiss after 4 seconds
- ✅ Multiple toasts stack properly

### Test 9.3: Form Validation
**Steps:**
1. Try to submit goal form with empty fields

**Expected:**
- ✅ Validation errors show
- ✅ Form doesn't submit
- ✅ Error messages are clear

### Test 9.4: Responsive Design
**Steps:**
1. Resize browser window
2. Test on mobile viewport

**Expected:**
- ✅ Layout adapts to screen size
- ✅ Navigation works on mobile
- ✅ Charts are responsive

---

## 🐛 Error Handling Tests

### Test 10.1: Network Error
**Steps:**
1. Stop backend server
2. Try to create a goal

**Expected:**
- ✅ Error toast appears
- ✅ User-friendly error message
- ✅ App doesn't crash

### Test 10.2: Validation Error
**Steps:**
1. Try to create goal with invalid data

**Expected:**
- ✅ Backend returns 400 error
- ✅ Frontend shows specific error message
- ✅ Form highlights invalid fields

### Test 10.3: Server Error
**Steps:**
1. Cause a 500 error (modify backend to throw error)

**Expected:**
- ✅ Error toast appears
- ✅ Generic error message shown
- ✅ App remains functional

---

## 📊 Performance Tests

### Test 11.1: Page Load Time
**Steps:**
1. Open DevTools → Network tab
2. Navigate to dashboard

**Expected:**
- ✅ Initial load < 2 seconds
- ✅ API calls complete < 500ms
- ✅ Charts render smoothly

### Test 11.2: Large Data Sets
**Steps:**
1. Create 50+ goals
2. View goals list

**Expected:**
- ✅ List renders without lag
- ✅ Pagination works (if implemented)
- ✅ Filtering is responsive

---

## ✅ Final Checklist

### Backend
- [ ] All endpoints return correct data
- [ ] JWT authentication works
- [ ] Role-based access enforced
- [ ] Audit logs created for all actions
- [ ] Database queries optimized
- [ ] Error handling works
- [ ] CORS configured correctly

### Frontend
- [ ] All pages load without errors
- [ ] API calls use real endpoints
- [ ] No mock data in production code
- [ ] Loading states implemented
- [ ] Error handling works
- [ ] Toast notifications work
- [ ] Protected routes work
- [ ] Role-based UI works

### Integration
- [ ] Login flow works end-to-end
- [ ] Goal CRUD works
- [ ] Approval workflow works
- [ ] Check-ins work
- [ ] Analytics show real data
- [ ] Admin features work
- [ ] Audit logs work
- [ ] CSV exports work

### Security
- [ ] Passwords are hashed
- [ ] JWT tokens expire
- [ ] Role-based access enforced
- [ ] Input validation works
- [ ] SQL injection prevented
- [ ] XSS protection enabled

---

## 🎯 Success Criteria

Your application passes if:

✅ All user flows work end-to-end  
✅ No console errors  
✅ All API calls succeed  
✅ Audit logs are created  
✅ Analytics show real data  
✅ Security measures work  
✅ Error handling is graceful  
✅ UI is responsive  

---

## 📝 Test Report Template

```markdown
# Test Report - [Date]

## Environment
- Backend: Running on port 8000
- Frontend: Running on port 5173
- Database: SQLite (thryve.db)

## Tests Executed
- [ ] Authentication (5/5 passed)
- [ ] Goal Management (5/5 passed)
- [ ] Approval Workflow (4/4 passed)
- [ ] Check-ins (3/3 passed)
- [ ] Analytics (4/4 passed)
- [ ] Admin Features (5/5 passed)
- [ ] Audit Trail (3/3 passed)
- [ ] Security (3/3 passed)

## Issues Found
1. [Issue description]
   - Severity: High/Medium/Low
   - Steps to reproduce
   - Expected vs Actual

## Overall Status
✅ PASS / ❌ FAIL

## Notes
[Any additional observations]
```

---

## 🚀 Ready for Demo!

If all tests pass, your application is:
- ✅ Production-ready
- ✅ Demo-ready
- ✅ Hackathon-ready
- ✅ Portfolio-ready

**Go showcase your work! 🎉**
