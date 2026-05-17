"""
Phase 4 Test Script - Verify Analytics, Audit, and Admin features
Run this after starting the backend server to test Phase 4 functionality
"""
import requests
import json

BASE_URL = "http://localhost:8000"

# Test credentials (update these based on your test data)
ADMIN_EMAIL = "admin@thryve.com"
ADMIN_PASSWORD = "admin123"
MANAGER_EMAIL = "manager@thryve.com"
MANAGER_PASSWORD = "manager123"
EMPLOYEE_EMAIL = "employee@thryve.com"
EMPLOYEE_PASSWORD = "employee123"


def login(email, password):
    """Login and get access token"""
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": email, "password": password}
    )
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print(f"❌ Login failed for {email}: {response.text}")
        return None


def test_analytics_endpoints(token):
    """Test analytics endpoints"""
    print("\n" + "="*60)
    print("🔍 TESTING ANALYTICS ENDPOINTS")
    print("="*60)
    
    headers = {"Authorization": f"Bearer {token}"}
    
    endpoints = [
        "/analytics/overview",
        "/analytics/team",
        "/analytics/departments",
        "/analytics/trends",
        "/analytics/strategic-areas",
        "/analytics/rankings",
        "/analytics/status-distribution",
    ]
    
    for endpoint in endpoints:
        response = requests.get(f"{BASE_URL}{endpoint}", headers=headers)
        if response.status_code == 200:
            print(f"✅ {endpoint}")
            # Print sample data
            data = response.json()
            if isinstance(data, dict):
                print(f"   Keys: {list(data.keys())[:5]}")
            elif isinstance(data, list):
                print(f"   Items: {len(data)}")
        else:
            print(f"❌ {endpoint} - Status: {response.status_code}")


def test_audit_endpoints(token):
    """Test audit endpoints"""
    print("\n" + "="*60)
    print("📋 TESTING AUDIT ENDPOINTS")
    print("="*60)
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test my audit logs
    response = requests.get(f"{BASE_URL}/audit/logs", headers=headers)
    if response.status_code == 200:
        logs = response.json()
        print(f"✅ /audit/logs - Found {len(logs)} logs")
    else:
        print(f"❌ /audit/logs - Status: {response.status_code}")
    
    # Test team logs (manager/admin only)
    response = requests.get(f"{BASE_URL}/audit/team-logs", headers=headers)
    if response.status_code == 200:
        logs = response.json()
        print(f"✅ /audit/team-logs - Found {len(logs)} logs")
    elif response.status_code == 403:
        print(f"⚠️  /audit/team-logs - Forbidden (expected for non-manager)")
    else:
        print(f"❌ /audit/team-logs - Status: {response.status_code}")


def test_admin_endpoints(token):
    """Test admin endpoints"""
    print("\n" + "="*60)
    print("👑 TESTING ADMIN ENDPOINTS")
    print("="*60)
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test system health
    response = requests.get(f"{BASE_URL}/admin/system-health", headers=headers)
    if response.status_code == 200:
        health = response.json()
        print(f"✅ /admin/system-health")
        print(f"   Total Users: {health.get('total_users')}")
        print(f"   Total Goals: {health.get('total_goals')}")
        print(f"   Status: {health.get('status')}")
    elif response.status_code == 403:
        print(f"⚠️  /admin/system-health - Forbidden (expected for non-admin)")
    else:
        print(f"❌ /admin/system-health - Status: {response.status_code}")
    
    # Test org analytics
    response = requests.get(f"{BASE_URL}/admin/org-analytics", headers=headers)
    if response.status_code == 200:
        print(f"✅ /admin/org-analytics")
        data = response.json()
        print(f"   Sections: {list(data.keys())}")
    elif response.status_code == 403:
        print(f"⚠️  /admin/org-analytics - Forbidden (expected for non-admin)")
    else:
        print(f"❌ /admin/org-analytics - Status: {response.status_code}")
    
    # Test recent activity
    response = requests.get(f"{BASE_URL}/admin/recent-activity", headers=headers)
    if response.status_code == 200:
        activity = response.json()
        print(f"✅ /admin/recent-activity - Found {len(activity)} activities")
    elif response.status_code == 403:
        print(f"⚠️  /admin/recent-activity - Forbidden (expected for non-admin)")
    else:
        print(f"❌ /admin/recent-activity - Status: {response.status_code}")


def test_approval_pipeline(token):
    """Test approval pipeline metrics"""
    print("\n" + "="*60)
    print("⚡ TESTING APPROVAL PIPELINE")
    print("="*60)
    
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/analytics/approval-pipeline", headers=headers)
    if response.status_code == 200:
        pipeline = response.json()
        print(f"✅ /analytics/approval-pipeline")
        print(f"   Pending: {pipeline.get('pending_approvals')}")
        print(f"   Approved: {pipeline.get('approved_goals')}")
        print(f"   Rejected: {pipeline.get('rejected_goals')}")
        print(f"   Approval Rate: {pipeline.get('approval_rate')}%")
    elif response.status_code == 403:
        print(f"⚠️  /analytics/approval-pipeline - Forbidden (expected for non-manager)")
    else:
        print(f"❌ /analytics/approval-pipeline - Status: {response.status_code}")


def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("🚀 PHASE 4 BACKEND TEST SUITE")
    print("="*60)
    print("\nMake sure the backend server is running on http://localhost:8000")
    print("Update credentials in this script if needed\n")
    
    # Test with employee token
    print("\n📝 Testing as EMPLOYEE...")
    employee_token = login(EMPLOYEE_EMAIL, EMPLOYEE_PASSWORD)
    if employee_token:
        test_analytics_endpoints(employee_token)
        test_audit_endpoints(employee_token)
        test_admin_endpoints(employee_token)  # Should get 403s
    
    # Test with manager token
    print("\n📝 Testing as MANAGER...")
    manager_token = login(MANAGER_EMAIL, MANAGER_PASSWORD)
    if manager_token:
        test_approval_pipeline(manager_token)
        test_audit_endpoints(manager_token)
    
    # Test with admin token
    print("\n📝 Testing as ADMIN...")
    admin_token = login(ADMIN_EMAIL, ADMIN_PASSWORD)
    if admin_token:
        test_admin_endpoints(admin_token)
        test_audit_endpoints(admin_token)
    
    print("\n" + "="*60)
    print("✅ PHASE 4 TEST COMPLETE")
    print("="*60)
    print("\nIf you see ✅ marks, Phase 4 is working correctly!")
    print("If you see ❌ marks, check the error messages above.")
    print("If you see ⚠️  marks, that's expected (permission denied for that role).\n")


if __name__ == "__main__":
    main()
