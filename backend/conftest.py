import pytest
import requests


@pytest.fixture(scope="session")
def token():
    """Best-effort admin token fixture for legacy script-style tests."""
    candidates = [
        "http://localhost:8000/auth/login",
        "http://localhost:8000/api/auth/login",
    ]
    payload = {"email": "admin@thryve.com", "password": "admin123"}

    for url in candidates:
        try:
            response = requests.post(url, json=payload, timeout=5)
            if response.status_code == 200:
                return response.json().get("access_token", "")
        except requests.RequestException:
            continue

    # Keep legacy tests running even when API is not reachable.
    return ""


@pytest.fixture(scope="session")
def dept_id():
    """Fallback department id used by legacy endpoint smoke tests."""
    return 1
