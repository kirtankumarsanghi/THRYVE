# Vercel Frontend Deployment Setup

## Issue: "Backend is offline. Please start the API server on port 8000"

This error occurs because the frontend is trying to connect to `localhost:8000` instead of your Render backend.

## Solution: Configure Environment Variables

### Option 1: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `thryve` (or whatever you named it)

2. **Navigate to Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the left sidebar

3. **Add Environment Variable**
   - **Key**: `VITE_API_URL`
   - **Value**: `https://thryve-5pie.onrender.com`
   - **Environments**: Check all (Production, Preview, Development)
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots (...) on the latest deployment
   - Click "Redeploy"
   - OR just push a new commit to trigger automatic deployment

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Set environment variable
vercel env add VITE_API_URL production
# When prompted, enter: https://thryve-5pie.onrender.com

# Redeploy
vercel --prod
```

### Option 3: Already Configured in Code

We've already updated:
- ✅ `frontend/.env.production` - Set to Render URL
- ✅ `frontend/vercel.json` - Added environment configuration

Just push the changes and Vercel will use the correct backend URL!

## Verify Configuration

After redeployment, check:

1. **Visit your Vercel URL**
2. **Open Browser Console** (F12)
3. **Check Network Tab**
4. **Look for API calls** - They should go to `https://thryve-5pie.onrender.com`

## Common Issues

### Issue: Still showing "Backend is offline"

**Possible causes:**
1. Render backend is not running
2. Environment variable not set correctly
3. CORS not configured on backend

**Solutions:**

1. **Check Render backend status**
   - Visit: https://thryve-5pie.onrender.com
   - Should show: `{"message": "THRYVE Backend Running"}`

2. **Verify environment variable**
   - Vercel Dashboard → Settings → Environment Variables
   - Confirm `VITE_API_URL` is set correctly

3. **Check CORS configuration**
   - Backend should allow requests from your Vercel domain
   - See backend `main.py` for CORS settings

### Issue: CORS Error

If you see CORS errors in the console, update backend CORS configuration:

```python
# In backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://your-vercel-app.vercel.app",  # Add your Vercel URL
        "https://thryve-5pie.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Project Structure

```
thryve/
├── frontend/
│   ├── .env                    # Local development (localhost:8000)
│   ├── .env.production         # Production (Render URL) ✅ Updated
│   ├── vercel.json            # Vercel config ✅ Created
│   └── ...
└── backend/
    └── ...
```

## Deployment Checklist

- [x] Update `.env.production` with Render URL
- [x] Create `vercel.json` with environment config
- [ ] Set `VITE_API_URL` in Vercel Dashboard
- [ ] Push changes to GitHub
- [ ] Wait for Vercel to redeploy
- [ ] Test login functionality

## Testing

After deployment:

1. **Visit your Vercel URL**
2. **Click "Sign In"**
3. **Try logging in with**: admin@thryve.com / admin123
4. **Should successfully connect to backend** ✅

## Environment URLs

- **Frontend (Vercel)**: https://your-app.vercel.app
- **Backend (Render)**: https://thryve-5pie.onrender.com
- **API Endpoint**: https://thryve-5pie.onrender.com/auth/login

## Next Steps

1. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Configure frontend to use Render backend URL"
   git push origin main
   ```

2. Set environment variable in Vercel Dashboard (if not using vercel.json)

3. Wait for deployment to complete

4. Test the application!

---

**Note**: Make sure your Render backend is running and accessible before testing the frontend!
