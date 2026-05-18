# Manager Dashboard Testing Guide

## Quick Start Testing

### Prerequisites
1. Backend server running on `http://localhost:8000`
2. Frontend server running on `http://localhost:5173`
3. Test user with manager role

### Test User Credentials
```
Email: manager@example.com
Password: [Your test password]
Role: manager
```

## Automated Test Checklist

### ✅ Visual Elements Test

Run through each section and verify:

#### 1. Top Navigation Bar
- [ ] "Thryve." logo displays
- [ ] Search bar is visible and functional
- [ ] "SYSTEM LIVE" indicator is animated (green pulse)
- [ ] Refresh button is present
- [ ] Bell icon shows notification badge if approvals > 0
- [ ] Help icon is visible

#### 2. Header Section
- [ ] Breadcrumb shows: Management > [Department]
- [ ] Welcome message shows: "Welcome back, [FirstName]"
- [ ] Subtitle shows: "Here's your team overview for this quarter."
- [ ] Quarter selector shows "Q3 FY26" as active
- [ ] "Export PDF" button is visible

#### 3. Live Data Notice
- [ ] Banner shows: "Manager + Analytics APIs"
- [ ] Hint text displays correctly

#### 4. Stats Cards (4 cards)
- [ ] **Card 1**: Avg Output Score
  - Shows value out of 5.0
  - Has trend indicator
  - Icon: TrendingUp
  - Color: Emerald

- [ ] **Card 2**: Utilization Rate
  - Shows percentage
  - Has animated progress bar
  - Icon: Activity
  - Color: Indigo

- [ ] **Card 3**: Team Members
  - Shows count
  - Shows "X on track · Y at risk"
  - Icon: Users
  - Color: Cyan

- [ ] **Card 4**: Pending Decisions
  - Shows count
  - Has urgent indicator if > 0
  - Icon: Gavel
  - Color: Amber

#### 5. Velocity Chart
- [ ] Chart title: "Team Velocity vs. Capacity"
- [ ] Subtitle: "Weekly performance tracking"
- [ ] Legend shows: VELOCITY (indigo) and CAPACITY (gray)
- [ ] Chart displays 5 data points (W1, W4, W8, W12, NOW)
- [ ] Velocity line is solid indigo
- [ ] Capacity line is dashed gray
- [ ] Hover shows tooltip with values

#### 6. Priority Approvals Section
- [ ] Title: "Priority Approvals"
- [ ] Badge shows count: "X New"
- [ ] If no approvals: Shows checkmark and "All caught up!"
- [ ] If approvals exist:
  - Shows up to 3 approval cards
  - Each card has: title, employee avatar, employee name, "Review" button
  - "View all X approvals →" link if more than 3

#### 7. Quick Actions Section
- [ ] Title: "Quick Actions"
- [ ] 4 action buttons:
  - View Team Goals (Target icon, indigo)
  - Schedule 1-on-1 (Clock icon, cyan)
  - Team Check-ins (CheckCircle icon, emerald)
  - Export Reports (Download icon, amber)
- [ ] Each button has hover effect
- [ ] ChevronRight icon appears on hover

#### 8. Direct Reports Table
- [ ] Title: "Direct Reports"
- [ ] Subtitle: "X team members · Performance overview"
- [ ] "View All" button with Users icon
- [ ] If no team: Shows empty state with Users icon
- [ ] If team exists:
  - Table headers: Employee, Department, Progress, Status, Score, (Actions)
  - Each row shows:
    - Avatar with initials
    - Employee name and email
    - Department name
    - Progress bar with percentage
    - Status badge (On Track/In Progress/At Risk/Not Started)
    - 5-star rating
    - "Review" link on hover

### ✅ Functionality Test

#### 1. Search Functionality
```
Test Steps:
1. Type in search bar
2. Verify input is captured
3. (Future: Verify filtering works)
```

#### 2. Refresh Functionality
```
Test Steps:
1. Click refresh button
2. Verify button shows spinning animation
3. Verify data reloads
4. Verify animation stops after load
```

#### 3. Navigation Links
Test each link navigates correctly:
- [ ] "View Team Goals" → `/manager/team-goals`
- [ ] "Schedule 1-on-1" → `/manager/one-on-ones`
- [ ] "Team Check-ins" → `/manager/checkins`
- [ ] "Export Reports" → `/manager/reports`
- [ ] "View All" (approvals) → `/manager/approvals`
- [ ] "View All" (team) → `/manager/team`
- [ ] "Review" (approval) → `/manager/approvals`
- [ ] "Review" (team member) → `/manager/review/[id]`

#### 4. Data Loading
```
Test Steps:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to Manager Dashboard
4. Verify API calls:
   - GET /api/approvals/pending
   - GET /api/analytics/team
   - GET /api/analytics/departments
5. Check response status: 200 OK
6. Verify data populates correctly
```

#### 5. Responsive Design
Test at different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

Verify:
- [ ] Layout adjusts properly
- [ ] No horizontal scroll
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] Tables scroll horizontally on mobile

### ✅ Data Accuracy Test

#### 1. Stats Calculations
```javascript
// Verify these calculations:
avgCompletion = sum(team.completion_rate) / team.length
avgScore = (avgCompletion / 100) * 5
onTrackCount = team.filter(m => m.completion_rate >= 60).length
atRiskCount = team.filter(m => m.completion_rate < 60 && m.completion_rate > 0).length
```

#### 2. Team Member Status
```javascript
// Verify status logic:
rate >= 75 → "On Track" (emerald)
rate >= 40 → "In Progress" (blue)
rate > 0 → "At Risk" (amber)
rate === 0 → "Not Started" (gray)
```

#### 3. Star Rating
```javascript
// Verify star calculation:
score = Math.round(completion_rate / 20)
// Should show 0-5 filled stars
```

### ✅ Performance Test

#### 1. Load Time
```
Test Steps:
1. Open DevTools Performance tab
2. Record page load
3. Verify:
   - Initial render < 2s
   - API calls complete < 1s
   - Chart renders < 500ms
   - Table renders < 300ms
```

#### 2. Animation Performance
```
Test Steps:
1. Check for smooth animations:
   - Fade-in effects
   - Progress bar animations
   - Hover transitions
   - Pulse animation
2. Verify no jank or stuttering
```

### ✅ Error Handling Test

#### 1. API Failure
```
Test Steps:
1. Stop backend server
2. Refresh dashboard
3. Verify:
   - Loading state shows
   - Error is handled gracefully
   - No console errors crash the app
   - User sees appropriate message
```

#### 2. Empty Data
```
Test Steps:
1. Login as manager with no team
2. Verify:
   - Empty states show correctly
   - No errors in console
   - UI remains functional
```

#### 3. Invalid Data
```
Test Steps:
1. Mock API to return invalid data
2. Verify:
   - App doesn't crash
   - Fallback values are used
   - User sees appropriate message
```

### ✅ Accessibility Test

#### 1. Keyboard Navigation
```
Test Steps:
1. Use Tab key to navigate
2. Verify:
   - All interactive elements are reachable
   - Focus indicators are visible
   - Enter key activates buttons/links
```

#### 2. Screen Reader
```
Test Steps:
1. Use screen reader (NVDA/JAWS)
2. Verify:
   - All content is announced
   - Images have alt text
   - Buttons have labels
   - Tables have proper headers
```

#### 3. Color Contrast
```
Test Steps:
1. Use browser accessibility tools
2. Verify:
   - Text has sufficient contrast
   - Status colors are distinguishable
   - Focus indicators are visible
```

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Console Checks

### Expected Console Output:
```
✅ No errors
✅ No warnings (except dev mode warnings)
✅ API calls logged (if debug mode)
```

### Common Issues:
```
❌ "Failed to fetch" → Backend not running
❌ "401 Unauthorized" → Not logged in or token expired
❌ "403 Forbidden" → User doesn't have manager role
❌ "404 Not Found" → API endpoint doesn't exist
❌ "500 Internal Server Error" → Backend error
```

## Quick Test Commands

### Check if Backend is Running:
```bash
curl http://localhost:8000/api/health
```

### Check if Frontend is Running:
```bash
curl http://localhost:5173
```

### Check API Endpoints:
```bash
# Get pending approvals
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/approvals/pending

# Get team analytics
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/analytics/team

# Get department analytics
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/analytics/departments
```

## Test Results Template

```
Date: [Date]
Tester: [Name]
Browser: [Browser + Version]
Screen Size: [Resolution]

Visual Elements: ✅ / ❌
Functionality: ✅ / ❌
Data Accuracy: ✅ / ❌
Performance: ✅ / ❌
Error Handling: ✅ / ❌
Accessibility: ✅ / ❌

Issues Found:
1. [Description]
2. [Description]

Notes:
[Additional observations]
```

## Automated Testing (Future)

### Unit Tests (Jest + React Testing Library):
```javascript
describe('ManagerDashboard', () => {
  test('renders without crashing', () => {});
  test('displays stats cards', () => {});
  test('loads team data', () => {});
  test('handles refresh', () => {});
  test('navigates to correct pages', () => {});
});
```

### Integration Tests (Cypress):
```javascript
describe('Manager Dashboard Flow', () => {
  it('should load and display data', () => {});
  it('should refresh data on button click', () => {});
  it('should navigate to approval page', () => {});
  it('should filter team members', () => {});
});
```

### E2E Tests (Playwright):
```javascript
test('complete manager workflow', async ({ page }) => {
  // Login as manager
  // Navigate to dashboard
  // Verify all sections load
  // Click through all links
  // Verify data updates
});
```

---

**Testing Priority**: High
**Estimated Time**: 30-45 minutes for complete manual test
**Automation**: Recommended for CI/CD pipeline
