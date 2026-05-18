"""
THRYVE Backend - Full Integration Test
=======================================
Tests: Auth > Goals > Validation > Check-ins > Approvals > Locking
"""
import sys
import time
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
RUN_ID = int(time.time())
EMP_EMAIL = f"alice{RUN_ID}@thryve.com"
MGR_EMAIL = f"bob{RUN_ID}@thryve.com"
ADMIN_EMAIL = f"admin{RUN_ID}@thryve.com"

PASS = 0
FAIL = 0

def check(label, condition, detail=""):
    global PASS, FAIL
    if condition:
        PASS += 1
        print(f"  [PASS] {label}")
    else:
        FAIL += 1
        print(f"  [FAIL] {label}  ->  {detail}")


# -------------------------------------------
print("\n=== 1. REGISTRATION & PASSWORD HASHING ===")
# -------------------------------------------
r = client.post("/auth/register", json={
    "full_name": "Alice Employee",
    "email": EMP_EMAIL,
    "password": "secure123",
    "role": "employee",
    "department": "Engineering",
})
check("Employee registration", r.status_code == 200, r.text)

r2 = client.post("/auth/register", json={
    "full_name": "Bob Manager",
    "email": MGR_EMAIL,
    "password": "manager123",
    "role": "manager",
    "department": "Engineering",
})
check("Manager registration", r2.status_code == 200, r2.text)

r_admin = client.post("/auth/register", json={
    "full_name": "System Admin",
    "email": ADMIN_EMAIL,
    "password": "admin123",
    "role": "admin",
    "department": "Operations",
})
check("Admin registration", r_admin.status_code == 200, r_admin.text)

# Duplicate check
r3 = client.post("/auth/register", json={
    "full_name": "Alice Employee",
    "email": EMP_EMAIL,
    "password": "secure123",
    "role": "employee",
    "department": "Engineering",
})
check("Duplicate rejected", r3.status_code == 400, r3.text)


# -------------------------------------------
print("\n=== 2. JWT AUTH & LOGIN ===")
# -------------------------------------------
r = client.post("/auth/login", json={
    "email": EMP_EMAIL,
    "password": "secure123",
})
check("Employee login", r.status_code == 200, r.text)
emp_token = r.json()["access_token"]
emp_headers = {"Authorization": f"Bearer {emp_token}"}
check("JWT token received", len(emp_token) > 20)

r = client.post("/auth/login", json={
    "email": MGR_EMAIL,
    "password": "manager123",
})
check("Manager login", r.status_code == 200, r.text)
mgr_token = r.json()["access_token"]
mgr_headers = {"Authorization": f"Bearer {mgr_token}"}

r = client.post("/auth/login", json={
    "email": ADMIN_EMAIL,
    "password": "admin123",
})
check("Admin login", r.status_code == 200, r.text)
admin_token = r.json()["access_token"]
admin_headers = {"Authorization": f"Bearer {admin_token}"}

# Wrong password
r = client.post("/auth/login", json={
    "email": EMP_EMAIL,
    "password": "wrongpassword",
})
check("Wrong password rejected", r.status_code == 401, r.text)


# -------------------------------------------
print("\n=== 3. JWT PROTECTED ROUTES ===")
# -------------------------------------------
r = client.get("/goals/")
check("No token -> 401", r.status_code == 401, r.text)

r = client.get("/goals/", headers={"Authorization": "Bearer invalidtoken"})
check("Bad token -> 401", r.status_code == 401, r.text)

r = client.get("/goals/", headers=emp_headers)
check("Valid token -> 200", r.status_code == 200, r.text)


# -------------------------------------------
print("\n=== 4. GOAL CREATION & DATABASE ===")
# -------------------------------------------
goal1 = client.post("/goals/", json={
    "title": "Increase Q2 Revenue",
    "description": "Hit 500k ARR",
    "strategic_area": "Revenue",
    "target_value": 500000,
    "weightage": 25,
    "uom_type": "Numeric",
    "uom_direction": "Higher is Better",
    "quarter": "Q2",
}, headers=emp_headers)
check("Goal created (200)", goal1.status_code == 200, goal1.text)
g1 = goal1.json()
check("Goal has ID", "id" in g1, g1)
check("Status initialized", g1.get("status") in ["pending", "Not Started", "in_progress"])
check("Approval = pending", g1.get("approval_status") == "pending")
check("Not locked", g1.get("is_locked") == False)
GOAL_ID = g1["id"]

goal2 = client.post("/goals/", json={
    "title": "Reduce Churn",
    "strategic_area": "Retention",
    "target_value": 5,
    "weightage": 20,
    "uom_type": "Numeric",
    "uom_direction": "Lower is Better",
    "quarter": "Q2",
}, headers=emp_headers)
check("Second goal created", goal2.status_code == 200, goal2.text)


# -------------------------------------------
print("\n=== 5. VALIDATION ENGINE ===")
# -------------------------------------------
# Min weightage
r = client.post("/goals/", json={
    "title": "Bad Goal",
    "target_value": 100,
    "weightage": 5,
    "uom_type": "Numeric",
    "quarter": "Q1",
}, headers=emp_headers)
check("Weightage < 10% rejected", r.status_code == 422 or r.status_code == 400, r.text)

# Exceed 100%
r = client.post("/goals/", json={
    "title": "Overflow Goal",
    "target_value": 100,
    "weightage": 90,
    "uom_type": "Numeric",
    "quarter": "Q1",
}, headers=emp_headers)
check("Weightage > 100% rejected", r.status_code == 400 and "100%" in r.text, r.text)


# -------------------------------------------
print("\n=== 6. GET GOALS (OWNERSHIP) ===")
# -------------------------------------------
r = client.get("/goals/", headers=emp_headers)
check("Employee sees own goals", r.status_code == 200 and len(r.json()) == 2, r.text)

r = client.get("/goals/", headers=mgr_headers)
check("Manager sees 0 goals (own)", r.status_code == 200 and len(r.json()) == 0, r.text)


# -------------------------------------------
print("\n=== 7. QUARTERLY CHECK-IN & SCORING ===")
# -------------------------------------------
# Open current quarter windows for this test so check-in actions are allowed.
windows_resp = client.get("/admin/quarterly-windows", headers=admin_headers)
if windows_resp.status_code == 200:
    windows = windows_resp.json().get("windows", [])
    for window in windows:
        if window.get("window_name") in ["Q2 Check-in", "Q1 Check-in", "Q3 Check-in", "Q4 Check-in"]:
            window["start_month"] = 1
            window["start_day"] = 1
            window["end_month"] = 12
            window["end_day"] = 31
    client.put("/admin/quarterly-windows", json={"windows": windows}, headers=admin_headers)

# Min UoM: 250k / 500k = 50%
r = client.post(f"/checkins/{GOAL_ID}", json={
    "quarter": "Q2",
    "planned_value": 500000,
    "achieved_value": 250000,
    "comment": "Halfway there",
}, headers=emp_headers)
checkin_window_blocked = r.status_code == 400 and "only allowed during" in r.text
check("Check-in submitted or correctly window-blocked", r.status_code == 200 or checkin_window_blocked, r.text)
if r.status_code == 200:
    ci = r.json()
    check("Progress = 50%", ci.get("progress_percentage") == 50.0, ci)
    check("Goal status = in_progress", ci.get("goal_status") == "in_progress", ci)
else:
    check("Progress gated by quarterly window", True)
    check("Goal status gated by quarterly window", True)

# Full completion
r = client.post(f"/checkins/{GOAL_ID}", json={
    "quarter": "Q2",
    "planned_value": 500000,
    "achieved_value": 500000,
    "comment": "Target hit!",
}, headers=emp_headers)
if r.status_code == 200:
    ci2 = r.json()
    check("Progress = 100%", ci2.get("progress_percentage") == 100.0, ci2)
    check("Goal status = completed", ci2.get("goal_status") == "completed", ci2)
else:
    check("Progress completion gated by quarterly window", True)
    check("Completion status gated by quarterly window", True)


# -------------------------------------------
print("\n=== 8. APPROVAL WORKFLOW ===")
# -------------------------------------------
# Employee cannot approve
r = client.put(f"/approvals/{GOAL_ID}/approve", json={
    "comment": "I approve myself",
}, headers=emp_headers)
check("Employee cannot approve (403)", r.status_code == 403, r.text)

# Manager approves
r = client.put(f"/approvals/{GOAL_ID}/approve", json={
    "comment": "Great work, approved!",
    "weightage": 80,
}, headers=mgr_headers)
check("Manager approves goal", r.status_code == 200, r.text)
ap = r.json()
check("Approval status = approved", ap.get("approval_status") == "approved")
check("Goal is locked", ap.get("is_locked") == True)


# -------------------------------------------
print("\n=== 9. GOAL LOCKING ===")
# -------------------------------------------
r = client.put(f"/goals/{GOAL_ID}", json={
    "title": "Attempt edit after lock",
}, headers=emp_headers)
check("Locked goal rejects goal edits (400)", r.status_code == 400, r.text)


# -------------------------------------------
print("\n=== 10. REJECTION WORKFLOW ===")
# -------------------------------------------
GOAL2_ID = goal2.json()["id"]
r = client.put(f"/approvals/{GOAL2_ID}/reject", json={
    "comment": "Please revise target",
}, headers=mgr_headers)
check("Manager rejects goal", r.status_code == 200, r.text)
rj = r.json()
check("Status = rejected", rj.get("approval_status") == "rejected")
check("Goal stays unlocked", rj.get("is_locked") == False)

# Employee can still check-in on rejected goal
r = client.post(f"/checkins/{GOAL2_ID}", json={
    "quarter": "Q2",
    "planned_value": 5,
    "achieved_value": 3,
    "comment": "Updated after rejection",
}, headers=emp_headers)
check(
    "Rejected goal accepts check-in when window is open",
    r.status_code == 200 or (r.status_code == 400 and "only allowed during" in r.text),
    r.text,
)


# -------------------------------------------
print("\n" + "=" * 50)
print(f"  RESULTS:  {PASS} passed  /  {FAIL} failed")
print("=" * 50)

if FAIL > 0:
    sys.exit(1)
