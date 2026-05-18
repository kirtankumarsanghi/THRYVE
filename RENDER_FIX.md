# Render Deployment Fix - SSL Error

## Problem
You're getting an SSL error when connecting to PostgreSQL on Render:
```
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) SSL error: decryption failed or bad record mac
```

## Solution Applied

### 1. Updated `backend/app/core/database.py`
- Added automatic `sslmode=require` parameter to PostgreSQL connection URLs
- Configured proper connection pooling and timeouts
- Added UTC timezone setting for PostgreSQL connections

### 2. Verified Dependencies
- Confirmed `psycopg2-binary==2.9.9` is in `requirements-prod.txt`
- This is the PostgreSQL driver needed for Render

## Deployment Steps

### Step 1: Commit and Push Changes
```bash
git add .
git commit -m "Fix PostgreSQL SSL connection and add seed endpoint for Render"
git push origin main
```

### Step 2: Configure Environment Variables on Render

Go to your Render dashboard and add these environment variables:

1. **Required Variables**:
   - `DATABASE_URL` - (Auto-set by Render PostgreSQL)
   - `SECRET_KEY` - Set to a secure random string (for JWT tokens)
   - `SEED_SECRET` - Set to a secure random string (for database seeding)
   - `ENVIRONMENT` - Set to `production`

2. **How to add**:
   - Render Dashboard → Your Service → Environment
   - Click "Add Environment Variable"
   - Enter key and value
   - Click "Save Changes"

### Step 3: Verify Build Configuration

Check these settings in Render:

1. **Build Command**:
   ```bash
   pip install -r requirements-prod.txt
   ```

2. **Start Command**:
   ```bash
   gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
   ```

### Step 4: Wait for Deployment

After pushing, Render will automatically deploy. Monitor the logs:
1. Go to Render dashboard → Your service → Logs
2. Wait for: "Application startup complete"

### Step 5: Seed the Database

**Important**: Render free tier doesn't support shell access, so we use an API endpoint instead.

See **[SEED_WITHOUT_SHELL.md](./SEED_WITHOUT_SHELL.md)** for detailed instructions.

**Quick method**:
```bash
# Check if seeding is needed
curl https://thryve-5pie.onrender.com/seed/seed-status

# Seed the database (replace YOUR_SEED_SECRET with your actual secret)
curl -X POST https://thryve-5pie.onrender.com/seed/seed-database \
  -H "X-Seed-Secret: YOUR_SEED_SECRET"
```

After seeding, you can login with:
- **Admin**: admin@thryve.com / admin123
- **Manager**: manager@thryve.com / manager123
- **Employee**: employee@thryve.com / employee123

## Alternative: If SSL Error Persists

If you still see SSL errors, try this alternative DATABASE_URL format in Render:

1. Go to Render Dashboard → Your PostgreSQL Database
2. Copy the "Internal Database URL"
3. Go to your Web Service → Environment
4. Update `DATABASE_URL` to include SSL parameter:
   ```
   postgresql://user:password@host:5432/database?sslmode=require
   ```

## Testing the Fix Locally

To test PostgreSQL connection locally (optional):
```bash
# Install PostgreSQL driver
pip install psycopg2-binary

# Set environment variable (use your Render database URL)
export DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Run the server
python -m uvicorn app.main:app --reload
```

## Common Issues

### Issue: "Worker failed to boot"
**Solution**: Check that all dependencies in `requirements-prod.txt` are installing correctly

### Issue: "Connection timeout"
**Solution**: Verify your PostgreSQL database is running and accessible from your web service

### Issue: "Authentication failed"
**Solution**: Verify DATABASE_URL credentials are correct

## Verification

Once deployed successfully, you should see:
1. ✅ Service status: "Live" (green)
2. ✅ Logs show: "Application startup complete"
3. ✅ Your app URL loads without 502 errors
4. ✅ Can login and access the application

## Need Help?

If issues persist:
1. Check Render logs for specific error messages
2. Verify PostgreSQL database is running
3. Test the DATABASE_URL connection string
4. Contact Render support if database connectivity issues continue
