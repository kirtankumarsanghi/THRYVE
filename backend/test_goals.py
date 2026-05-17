import requests

BASE_URL = "http://localhost:8000"

def test_goals():
    print("1. Authenticating to get JWT Token...")
    login_data = {
        "email": "testuser@example.com",
        "password": "securepassword123"
    }
    log_response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    if log_response.status_code != 200:
        print("[ERROR] Login failed")
        return
    token = log_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    print("\n2. Testing JWT Protected Route (GET /goals/)...")
    get_goals_res = requests.get(f"{BASE_URL}/goals/", headers=headers)
    if get_goals_res.status_code == 200:
        print("[SUCCESS] Accessed protected /goals route successfully")
    else:
        print(f"[ERROR] Failed to access protected route: {get_goals_res.text}")

    print("\n3. Testing Validation System (Weightage > 100%)...")
    invalid_goal = {
        "title": "Invalid Goal",
        "target_value": 100,
        "weightage": 150,  # Invalid
        "uom_type": "Min",
        "quarter": "Q1"
    }
    invalid_res = requests.post(f"{BASE_URL}/goals/", json=invalid_goal, headers=headers)
    if invalid_res.status_code == 400 and "weightage" in invalid_res.text.lower():
        print(f"[SUCCESS] Validation caught invalid weightage: {invalid_res.json()['detail']}")
    else:
        print(f"[WARN] Validation failed or unexpected status: {invalid_res.status_code} {invalid_res.text}")

    print("\n4. Testing Goal Engine & Real DB Storage (Valid Goal)...")
    valid_goal = {
        "title": "Increase Q2 Sales",
        "description": "Hit 500k ARR",
        "strategic_area": "Revenue",
        "target_value": 500000,
        "weightage": 20,
        "uom_type": "Min",
        "quarter": "Q2"
    }
    valid_res = requests.post(f"{BASE_URL}/goals/", json=valid_goal, headers=headers)
    if valid_res.status_code == 200:
        goal = valid_res.json()
        print(f"[SUCCESS] Goal created successfully in DB (ID: {goal['id']}, Status: {goal['status']})")
    else:
        print(f"[ERROR] Goal creation failed: {valid_res.text}")

if __name__ == "__main__":
    test_goals()
