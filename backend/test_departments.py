"""
Test Department Management API Endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def get_admin_token():
    """Login as admin and get token"""
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": "admin@thryve.com", "password": "admin123"}
    )
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print(f"❌ Login failed: {response.text}")
        return None

def test_get_departments(token):
    """Test GET /admin/departments"""
    print("\n📋 Testing GET /admin/departments...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/admin/departments", headers=headers)
    
    if response.status_code == 200:
        departments = response.json()
        print(f"✅ Success! Found {len(departments)} departments")
        for dept in departments[:3]:  # Show first 3
            print(f"   - {dept['code']}: {dept['name']} ({dept['employee_count']} employees)")
        return True
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return False

def test_create_department(token):
    """Test POST /admin/departments"""
    print("\n➕ Testing POST /admin/departments...")
    headers = {"Authorization": f"Bearer {token}"}
    
    new_dept = {
        "name": "Test Department",
        "code": "TEST",
        "description": "This is a test department",
        "manager_name": "Test Manager",
        "manager_email": "test@thryve.com",
        "budget": "$100K",
        "location": "Test City",
        "status": "active"
    }
    
    response = requests.post(
        f"{BASE_URL}/admin/departments",
        headers=headers,
        json=new_dept
    )
    
    if response.status_code == 201:
        dept = response.json()
        print(f"✅ Success! Created department: {dept['name']} (ID: {dept['id']})")
        return dept['id']
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return None

def test_update_department(token, dept_id):
    """Test PUT /admin/departments/{id}"""
    print(f"\n✏️ Testing PUT /admin/departments/{dept_id}...")
    headers = {"Authorization": f"Bearer {token}"}
    
    update_data = {
        "budget": "$150K",
        "description": "Updated test department"
    }
    
    response = requests.put(
        f"{BASE_URL}/admin/departments/{dept_id}",
        headers=headers,
        json=update_data
    )
    
    if response.status_code == 200:
        dept = response.json()
        print(f"✅ Success! Updated department: {dept['name']}")
        print(f"   - New budget: {dept['budget']}")
        return True
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return False

def test_get_single_department(token, dept_id):
    """Test GET /admin/departments/{id}"""
    print(f"\n🔍 Testing GET /admin/departments/{dept_id}...")
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(
        f"{BASE_URL}/admin/departments/{dept_id}",
        headers=headers
    )
    
    if response.status_code == 200:
        dept = response.json()
        print(f"✅ Success! Retrieved department: {dept['name']}")
        return True
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return False

def test_delete_department(token, dept_id):
    """Test DELETE /admin/departments/{id}"""
    print(f"\n🗑️ Testing DELETE /admin/departments/{dept_id}...")
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.delete(
        f"{BASE_URL}/admin/departments/{dept_id}",
        headers=headers,
        params={"force": False}
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Success! Deleted department: {result['name']}")
        return True
    else:
        print(f"❌ Failed: {response.status_code} - {response.text}")
        return False

def main():
    print("=" * 60)
    print("🧪 Department Management API Tests")
    print("=" * 60)
    
    # Get admin token
    print("\n🔐 Logging in as admin...")
    token = get_admin_token()
    if not token:
        print("❌ Cannot proceed without admin token")
        return
    print("✅ Login successful!")
    
    # Run tests
    results = []
    
    # Test 1: Get all departments
    results.append(("GET departments", test_get_departments(token)))
    
    # Test 2: Create department
    dept_id = test_create_department(token)
    results.append(("POST department", dept_id is not None))
    
    if dept_id:
        # Test 3: Get single department
        results.append(("GET single department", test_get_single_department(token, dept_id)))
        
        # Test 4: Update department
        results.append(("PUT department", test_update_department(token, dept_id)))
        
        # Test 5: Delete department
        results.append(("DELETE department", test_delete_department(token, dept_id)))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Summary")
    print("=" * 60)
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n🎯 Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
    else:
        print("⚠️ Some tests failed")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n❌ Test suite error: {e}")
        import traceback
        traceback.print_exc()
