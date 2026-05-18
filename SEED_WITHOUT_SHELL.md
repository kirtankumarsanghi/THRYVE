# Seed Database Without Shell Access (Render Free Tier)

Since Render's free tier doesn't support shell access, we've created an API endpoint to seed the database.

## Method 1: Using cURL (Recommended)

### Step 1: Set Environment Variable on Render

1. Go to Render Dashboard → Your Service → Environment
2. Add a new environment variable:
   - **Key**: `SEED_SECRET`
   - **Value**: `your-secure-random-string-here` (generate a random string)
3. Click "Save Changes"
4. Wait for service to redeploy

### Step 2: Check Seed Status

First, check if your database needs seeding:

```bash
curl https://thryve-5pie.onrender.com/seed/seed-status
```

Expected response:
```json
{
  "seeded": false,
  "users": 0,
  "departments": 0,
  "needs_seeding": true
}
```

### Step 3: Seed the Database

Run this command (replace `YOUR_SEED_SECRET` with the value you set in Step 1):

```bash
curl -X POST https://thryve-5pie.onrender.com/seed/seed-database \
  -H "X-Seed-Secret: YOUR_SEED_SECRET" \
  -H "Content-Type: application/json"
```

Expected response:
```json
{
  "status": "success",
  "message": "Database seeded successfully",
  "departments_created": 8,
  "users_created": 8,
  "demo_credentials": {
    "admin": {
      "email": "admin@thryve.com",
      "password": "admin123"
    },
    "manager": {
      "email": "manager@thryve.com",
      "password": "manager123"
    },
    "employee": {
      "email": "employee@thryve.com",
      "password": "employee123"
    }
  }
}
```

## Method 2: Using Postman or Browser Extension

### Using Postman:

1. Create a new POST request
2. URL: `https://thryve-5pie.onrender.com/seed/seed-database`
3. Headers:
   - `X-Seed-Secret`: `YOUR_SEED_SECRET`
   - `Content-Type`: `application/json`
4. Click "Send"

### Using Thunder Client (VS Code):

1. Install Thunder Client extension
2. Create new request:
   - Method: POST
   - URL: `https://thryve-5pie.onrender.com/seed/seed-database`
   - Headers: Add `X-Seed-Secret` with your secret value
3. Send request

## Method 3: Using Python Script

Create a file `seed_remote.py`:

```python
import requests

RENDER_URL = "https://thryve-5pie.onrender.com"
SEED_SECRET = "your-secure-random-string-here"  # Same as in Render env

# Check status
response = requests.get(f"{RENDER_URL}/seed/seed-status")
print("Status:", response.json())

# Seed database
if response.json()["needs_seeding"]:
    response = requests.post(
        f"{RENDER_URL}/seed/seed-database",
        headers={"X-Seed-Secret": SEED_SECRET}
    )
    print("Seed result:", response.json())
else:
    print("Database already seeded!")
```

Run it:
```bash
python seed_remote.py
```

## Demo User Credentials

After seeding, you can login with:

### Admin Account
- **Email**: admin@thryve.com
- **Password**: admin123

### Manager Account
- **Email**: manager@thryve.com
- **Password**: manager123

### Employee Account
- **Email**: employee@thryve.com
- **Password**: employee123

### Additional Demo Users
- sarah.chen@thryve.com (password: demo123)
- mike.johnson@thryve.com (password: demo123)
- alex.kim@thryve.com (password: demo123)
- emma.davis@thryve.com (password: demo123)
- john.smith@thryve.com (password: demo123)

## Departments Created

1. Engineering
2. Product
3. Design
4. Marketing
5. Sales
6. Customer Success
7. Operations
8. Finance

## Security Notes

1. **Change SEED_SECRET**: Use a strong, random string for `SEED_SECRET`
2. **One-time use**: The endpoint will refuse to seed if data already exists
3. **Production**: Consider removing or disabling the seed endpoint after initial setup
4. **Passwords**: Change demo passwords after first login in production

## Troubleshooting

### Error: "Invalid seed secret"
- Check that `SEED_SECRET` environment variable is set correctly on Render
- Verify you're using the exact same value in your request header

### Error: "Database already contains data"
- Database has already been seeded
- This is normal and prevents duplicate data

### Error: "Seed failed"
- Check Render logs for detailed error message
- Verify PostgreSQL database is connected and accessible
- Ensure all database migrations have run

## Verify Seeding Success

After seeding, visit your app and try logging in:

1. Go to: https://thryve-5pie.onrender.com
2. Click "Sign In"
3. Use any of the demo credentials above
4. You should be redirected to the appropriate dashboard

## Alternative: Render One-Off Jobs (Paid Plans)

If you upgrade to a paid Render plan, you can use one-off jobs:

```bash
# In Render Dashboard → Your Service → Shell
python seed_departments.py
python seed_demo_data.py
```

But the API endpoint method works on free tier! 🎉
