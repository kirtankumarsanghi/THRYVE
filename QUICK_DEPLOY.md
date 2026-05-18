# ⚡ Quick Deploy Guide - 15 Minutes to Live!

## 🎯 Fastest Way to Deploy (Render + Vercel)

### Step 1: Prepare Your Code (2 minutes)

```bash
# Make sure you're in the project root
cd "d:\Kirtan Folder\thryve"

# Commit all changes
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 2: Deploy Backend on Render (8 minutes)

1. **Go to [render.com](https://render.com)** and sign up with GitHub

2. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `thryve-db`
   - Region: Choose closest to you
   - Plan: **Free**
   - Click "Create Database"
   - ⚠️ **SAVE THE INTERNAL DATABASE URL** (you'll need it in step 4)

3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your `thryve` repository
   - Click "Connect"

4. **Configure Service**:
   ```
   Name: thryve-backend
   Region: [Same as database]
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements-prod.txt
   Start Command: gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
   Plan: Free
   ```

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   ```
   DATABASE_URL = [Paste your PostgreSQL Internal Database URL from step 2]
   SECRET_KEY = [Generate random: use any password generator, 32+ characters]
   ```

6. **Deploy**:
   - Click "Create Web Service"
   - Wait 5-8 minutes for deployment
   - ✅ You'll see "Live" when ready

7. **Initialize Database**:
   - Click "Shell" tab in your service
   - Run these commands one by one:
   ```bash
   python -c "from app.core.database import Base, engine; from app.models.user import User; from app.models.goal import Goal; from app.models.checkin import Checkin; from app.models.audit import AuditLog; from app.models.quarterly_window import QuarterlyWindow; from app.models.department import Department; Base.metadata.create_all(bind=engine)"
   
   python seed_departments.py
   
   python seed_demo_data.py
   ```

8. **Test Backend**:
   - Copy your backend URL (e.g., `https://thryve-backend.onrender.com`)
   - Visit: `https://your-backend-url.onrender.com/`
   - Should see: `{"message": "THRYVE Backend Running"}`
   - ✅ Backend is live!

### Step 3: Deploy Frontend on Vercel (5 minutes)

1. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your `thryve` repository
   - Click "Import"

3. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

4. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add:
   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual Render backend URL from Step 2)

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ You'll see "Congratulations!" when ready

6. **Copy Your URL**:
   - Copy your Vercel URL (e.g., `https://thryve.vercel.app`)

### Step 4: Update CORS (2 minutes)

1. **Go back to Render dashboard**
2. **Open your backend service**
3. **Go to "Environment" tab**
4. **Add new environment variable**:
   ```
   Name: FRONTEND_URL
   Value: https://your-vercel-url.vercel.app
   ```

5. **Or update code** (recommended):
   - Edit `backend/app/main.py`
   - Add your Vercel URL to `allow_origins`:
   ```python
   allow_origins=[
       "http://localhost:5173",
       "https://your-app.vercel.app",  # Add this
       "https://*.vercel.app",
   ]
   ```
   - Commit and push (Render will auto-redeploy)

### Step 5: Test Your Live App! 🎉

1. **Visit your Vercel URL**: `https://your-app.vercel.app`

2. **Login with demo credentials**:
   - **Admin**: `admin@thryve.com` / `admin123`
   - **Manager**: `manager@thryve.com` / `manager123`
   - **Employee**: `employee@thryve.com` / `employee123`

3. **Test key features**:
   - ✅ Login works
   - ✅ Dashboard loads
   - ✅ Create a goal
   - ✅ View analytics
   - ✅ Admin section works

---

## 🎊 You're Live!

**Your URLs**:
- 🌐 **Frontend**: `https://your-app.vercel.app`
- 🔌 **Backend**: `https://your-backend.onrender.com`
- 📚 **API Docs**: `https://your-backend.onrender.com/docs`

**Share your app**:
- Send the Vercel URL to anyone
- They can login with demo credentials
- All data persists in PostgreSQL

---

## ⚠️ Important Notes

### Free Tier Limitations

**Render Free**:
- ⏰ Sleeps after 15 minutes of inactivity
- 🐌 First request after sleep takes 30-60 seconds
- ✅ Perfect for demos and portfolios
- 💡 Upgrade to $7/month to remove sleep

**Vercel Free**:
- ✅ No sleep, always fast
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Perfect for frontend

### Keep Your App Awake

**Option 1**: Use a free uptime monitor
- [UptimeRobot](https://uptimerobot.com) - Free
- Ping your backend every 5 minutes
- Keeps it awake during business hours

**Option 2**: Upgrade to paid plan
- Render Starter: $7/month (no sleep)
- Railway Hobby: $5/month (no sleep)

---

## 🐛 Troubleshooting

### Backend shows "Application Error"
```bash
# Check logs in Render dashboard
# Common issues:
# 1. DATABASE_URL not set correctly
# 2. Missing dependencies in requirements-prod.txt
# 3. Database not initialized
```

### Frontend can't connect to backend
```bash
# Check:
# 1. VITE_API_URL is correct in Vercel
# 2. CORS is configured in backend
# 3. Backend is running (not sleeping)
```

### Database connection error
```bash
# Make sure:
# 1. PostgreSQL database is created
# 2. DATABASE_URL is set in backend
# 3. Database is initialized (ran seed scripts)
```

### CORS error in browser
```bash
# Fix:
# 1. Add your Vercel URL to CORS in main.py
# 2. Commit and push changes
# 3. Wait for Render to redeploy
```

---

## 📞 Need Help?

1. **Check logs**:
   - Render: Dashboard → Your Service → Logs
   - Vercel: Dashboard → Your Project → Deployments → View Function Logs

2. **Review full guide**: See `DEPLOYMENT_GUIDE.md`

3. **Common issues**: Check troubleshooting section above

---

## 🚀 Next Steps

### After Deployment

1. **Custom Domain** (Optional):
   - Buy domain from Namecheap, GoDaddy, etc.
   - Add to Vercel: Settings → Domains
   - Update DNS records

2. **Monitoring**:
   - Set up UptimeRobot for backend
   - Enable Vercel Analytics
   - Monitor Render logs

3. **Backups**:
   - Render: Automatic on paid plans
   - Manual: Use `pg_dump` via Shell

4. **Updates**:
   - Push to GitHub
   - Render auto-deploys backend
   - Vercel auto-deploys frontend

---

## ✅ Deployment Checklist

- [ ] Code committed and pushed to GitHub
- [ ] Render account created
- [ ] PostgreSQL database created on Render
- [ ] Backend service created on Render
- [ ] Environment variables set (DATABASE_URL, SECRET_KEY)
- [ ] Backend deployed successfully
- [ ] Database initialized (seed scripts run)
- [ ] Backend tested (visit /docs)
- [ ] Vercel account created
- [ ] Frontend project imported
- [ ] VITE_API_URL environment variable set
- [ ] Frontend deployed successfully
- [ ] CORS updated with Vercel URL
- [ ] Full app tested (login, create goal, etc.)
- [ ] Demo credentials work
- [ ] Mobile responsive verified

---

## 🎉 Success!

**Congratulations!** Your Thryve app is now live and accessible to anyone on the internet!

**Total Time**: ~15 minutes  
**Total Cost**: $0/month (Free tier)  
**Status**: Production Ready ✅

**Share your app**:
- Portfolio: Add to your resume/portfolio
- Demo: Show to potential employers
- Hackathon: Submit your live URL
- Friends: Share with colleagues

---

**Built with ❤️ • Deployed with 🚀 • Ready to Thryve! 🎯**
