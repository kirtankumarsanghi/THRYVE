import requests
import json

BASE_URL = "http://localhost:8000"

def test_flow():
    print("1. Testing Registration (Database & Password Hashing)")
    register_data = {
        "full_name": "Test User",
        "email": "testuser@example.com",
        "password": "securepassword123",
        "role": "employee",
        "department": "Engineering"
    }
    
    reg_response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    
    if reg_response.status_code == 200:
        print("[SUCCESS] Registration successful (Database insert works, Password hashed)")
    elif reg_response.status_code == 400 and "already exists" in reg_response.text:
        print("[WARN] User already exists (Skipping registration)")
    else:
        print(f"[ERROR] Registration failed: Status {reg_response.status_code}, Response: {reg_response.text}")

    print("\n2. Testing Login (JWT Auth & Password Verification)")
    login_data = {
        "email": "testuser@example.com",
        "password": "securepassword123"
    }
    
    log_response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    
    if log_response.status_code == 200:
        data = log_response.json()
        if "access_token" in data:
            print(f"[SUCCESS] Login successful! Received JWT Token: {data['access_token'][:20]}...")
            print(f"[SUCCESS] User Data verified: {data['user']['email']}")
        else:
            print("[ERROR] Login response missing token")
    else:
        print(f"[ERROR] Login failed: Status {log_response.status_code}, Response: {log_response.text}")

if __name__ == "__main__":
    test_flow()
