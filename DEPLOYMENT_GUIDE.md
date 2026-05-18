# 🚀 Thryve Deployment Guide

## Overview
This guide will help you deploy your Thryve application to production. We'll cover multiple deployment options from easiest to most advanced.

---

## 📋 Pre-Deployment Checklist

### ✅ Before You Start
- [ ] All features tested locally
- [ ] Backend runs without errors
- [ ] Frontend builds successfully
- [ ] Database schema is finalized
- [ ] Environment variables documented
- [ ] Git repository is up to date

---

## 🎯 Recommended Deployment Stack

### **Option 1: Easiest & Free** (Recommended for Demo/MVP)
- **Backend**: Render.com (Free tier)
- **Frontend**: Vercel (Free tier)
- **Database**: PostgreSQL on Render (Free tier)
- **Total Cost**: $0/month
- **Setup Time**: 30-45 minutes

### **Option 2: Production Ready**
- **Backend**: Railway.app ($5-10/month)
- **Frontend**: Vercel (Free)
- **Database**: PostgreSQL on Railway
- **Total Cost**: $5-10/month
- **Setup Time**: 20-30 minutes

### **Option 3: Enterprise**
- **Backend**: AWS EC2 or Heroku
- **Frontend**: AWS S3 + CloudFront or Netlify
- **Database**: AWS RDS PostgreSQL
- **Total Cost**: $20-50/month
- **Setup Time**: 1-2 hours

---

## 🚀 Option 1: Deploy with Render + Vercel (FREE)

This is the **easiest and recommended** option for getting started.

### Part A: Prepare Your Code

#### 1. Update Backend for Production

Create `backend/requirements-prod.txt`:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
pydantic==2.5.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
psycopg2-binary==2.9.9
gunicorn==21.2.0
```

Create `backend/Procfile`:
```
web: gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
```

Update `backend/app/core/database.py`:
```python
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Use PostgreSQL in production, SQLite in development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./thryve.db")

# Fix for Render's postgres:// URL (needs to be postgresql://)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Update `backend/app/main.py` CORS settings:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://your-app.vercel.app",  # Add your Vercel URL
        "https://*.vercel.app",  # Allow all Vercel preview deployments
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### 2. Update Frontend for Production

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

Update `frontend/src/api/axios.js`:
```javascript
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

#### 3. Create `.gitignore` (if not exists)
```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
.venv/
*.db
*.db-journal

# Node
node_modules/
dist/
.env.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

#### 4. Commit Your Changes
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Part B: Deploy Backend to Render

#### 1. Sign Up for Render
- Go to [render.com](https://render.com)
- Sign up with GitHub (recommended)

#### 2. Create PostgreSQL Database
1. Click "New +" → "PostgreSQL"
2. **Name**: `thryve-db`
3. **Database**: `thryve`
4. **User**: `thryve_user`
5. **Region**: Choose closest to you
6. **Plan**: Free
7. Click "Create Database"
8. **Save the Internal Database URL** (you'll need this)

#### 3. Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your `thryve` repository
4. Configure:
   - **Name**: `thryve-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements-prod.txt`
   - **Start Command**: `gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
   - **Plan**: Free

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable"
   ```
   DATABASE_URL = [paste your PostgreSQL Internal Database URL]
   SECRET_KEY = [generate a random string, e.g., use: openssl rand -hex 32]
   ```

6. Click "Create Web Service"

7. **Wait for deployment** (5-10 minutes)

8. **Initialize Database**:
   - Once deployed, go to "Shell" tab
   - Run:
   ```bash
   python -c "from app.core.database import Base, engine; from app.models.user import User; from app.models.goal import Goal; from app.models.checkin import Checkin; from app.models.audit import AuditLog; from app.models.quarterly_window import QuarterlyWindow; from app.models.department import Department; Base.metadata.create_all(bind=engine)"
   python seed_departments.py
   python seed_demo_data.py
   ```

9. **Test Your Backend**:
   - Visit: `https://your-backend.onrender.com/`
   - Should see: `{"message": "THRYVE Backend Running"}`
   - Visit: `https://your-backend.onrender.com/docs`
   - Should see Swagger API documentation

### Part C: Deploy Frontend to Vercel

#### 1. Sign Up for Vercel
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub (recommended)

#### 2. Import Project
1. Click "Add New..." → "Project"
2. Import your `thryve` repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**:
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   ```
   (Replace with your actual Render backend URL)

5. Click "Deploy"

6. **Wait for deployment** (2-3 minutes)

#### 3. Update Backend CORS
1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment" tab
4. Add your Vercel URL to CORS in `backend/app/main.py`:
   ```python
   allow_origins=[
       "https://your-app.vercel.app",
       "https://*.vercel.app",
   ]
   ```
5. Commit and push changes (Render will auto-redeploy)

#### 4. Test Your Application
- Visit your Vercel URL: `https://your-app.vercel.app`
- Login with demo credentials:
  - Admin: `admin@thryve.com` / `admin123`
  - Manager: `manager@thryve.com` / `manager123`
  - Employee: `employee@thryve.com` / `employee123`

---

## 🚀 Option 2: Deploy with Railway (Faster & Easier)

Railway is even easier and faster than Render, with better performance.

### 1. Sign Up for Railway
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

### 2. Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `thryve` repository
4. Railway will detect it's a Python app
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements-prod.txt`
   - **Start Command**: `gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`

6. **Add PostgreSQL**:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway automatically sets `DATABASE_URL`

7. **Add Environment Variables**:
   - Click on your service → "Variables"
   - Add:
   ```
   SECRET_KEY = [generate random string]
   ```

8. **Generate Domain**:
   - Click "Settings" → "Generate Domain"
   - Copy your domain (e.g., `thryve-backend.up.railway.app`)

9. **Initialize Database**:
   - Wait for deployment
   - Use Railway CLI or run seed scripts via GitHub Actions

### 3. Deploy Frontend to Vercel
- Same as Option 1, Part C
- Use your Railway backend URL in `VITE_API_URL`

---

## 🚀 Option 3: Deploy with Heroku (Traditional)

### 1. Install Heroku CLI
```bash
# Windows (using Chocolatey)
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create Heroku App
```bash
cd backend
heroku create thryve-backend
```

### 4. Add PostgreSQL
```bash
heroku addons:create heroku-postgresql:mini
```

### 5. Set Environment Variables
```bash
heroku config:set SECRET_KEY=$(openssl rand -hex 32)
```

### 6. Deploy
```bash
git subtree push --prefix backend heroku main
```

### 7. Initialize Database
```bash
heroku run python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"
heroku run python seed_demo_data.py
```

### 8. Deploy Frontend to Vercel
- Same as Option 1, Part C

---

## 🔧 Post-Deployment Configuration

### 1. Custom Domain (Optional)
**Vercel**:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

**Render**:
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records

### 2. Environment Variables
Make sure these are set in production:
```
# Backend
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
CORS_ORIGINS=https://your-frontend.com

# Frontend
VITE_API_URL=https://your-backend.com/api
```

### 3. Database Backups
**Render**: Automatic daily backups on paid plans
**Railway**: Automatic backups included
**Heroku**: Use `heroku pg:backups:capture`

### 4. Monitoring
- **Render**: Built-in logs and metrics
- **Railway**: Built-in observability
- **Vercel**: Analytics dashboard

---

## 🐛 Troubleshooting

### Backend Issues

#### "Application Error" or 500 Error
```bash
# Check logs
# Render: Dashboard → Logs tab
# Railway: Dashboard → Deployments → View Logs
# Heroku: heroku logs --tail
```

#### Database Connection Error
```bash
# Verify DATABASE_URL is set
# Check if database is running
# Ensure psycopg2-binary is installed
```

#### CORS Error
```bash
# Add your frontend URL to CORS origins
# Make sure to include https://
# Include both production and preview URLs
```

### Frontend Issues

#### API Calls Failing
```bash
# Check VITE_API_URL is correct
# Verify backend is running
# Check browser console for errors
# Ensure CORS is configured
```

#### Build Fails
```bash
# Check all dependencies are in package.json
# Verify build command is correct
# Check for TypeScript errors
# Ensure all imports are correct
```

#### Environment Variables Not Working
```bash
# Vercel: Must start with VITE_
# Redeploy after adding variables
# Check Variables tab in dashboard
```

---

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] Code is committed to Git
- [ ] All tests pass locally
- [ ] Environment variables documented
- [ ] Database schema finalized
- [ ] CORS configured for production
- [ ] Build succeeds locally

### Backend Deployment
- [ ] Database created
- [ ] Environment variables set
- [ ] Service deployed successfully
- [ ] Database initialized
- [ ] Demo data seeded
- [ ] API endpoints accessible
- [ ] Swagger docs working

### Frontend Deployment
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] Site is accessible
- [ ] API calls working
- [ ] Authentication working
- [ ] All pages load correctly

### Post-Deployment
- [ ] Test all user flows
- [ ] Verify admin functions
- [ ] Check analytics
- [ ] Test on mobile
- [ ] Monitor logs
- [ ] Set up backups

---

## 🎯 Quick Deploy Commands

### For Render + Vercel (Recommended)
```bash
# 1. Prepare code
git add .
git commit -m "Production ready"
git push origin main

# 2. Deploy backend on Render.com (via dashboard)
# 3. Deploy frontend on Vercel.com (via dashboard)
# 4. Test at your Vercel URL
```

### For Railway + Vercel
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize
cd backend
railway init

# 4. Deploy
railway up

# 5. Add PostgreSQL
railway add

# 6. Deploy frontend on Vercel (via dashboard)
```

---

## 💰 Cost Comparison

### Free Tier Limits

**Render Free**:
- ✅ 750 hours/month
- ✅ Sleeps after 15 min inactivity
- ✅ 512 MB RAM
- ✅ PostgreSQL 1GB storage

**Railway Free**:
- ✅ $5 credit/month
- ✅ No sleep
- ✅ Better performance
- ⚠️ Credit runs out quickly

**Vercel Free**:
- ✅ Unlimited bandwidth
- ✅ 100 GB-hours
- ✅ Automatic HTTPS
- ✅ Global CDN

### Paid Plans

**Render**:
- Starter: $7/month (no sleep)
- Standard: $25/month (more resources)

**Railway**:
- Hobby: $5/month (500 hours)
- Pro: $20/month (unlimited)

**Vercel**:
- Pro: $20/month (team features)

---

## 🚀 Recommended Setup for Different Scenarios

### Demo/Portfolio (Free)
```
Backend: Render Free
Frontend: Vercel Free
Database: Render PostgreSQL Free
Cost: $0/month
```

### MVP/Startup ($5-10/month)
```
Backend: Railway Hobby
Frontend: Vercel Free
Database: Railway PostgreSQL
Cost: $5-10/month
```

### Production ($20-50/month)
```
Backend: Render Standard or Railway Pro
Frontend: Vercel Pro
Database: Dedicated PostgreSQL
Cost: $20-50/month
```

---

## 📞 Support & Resources

### Documentation
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

### Community
- Render Community Forum
- Vercel Discord
- Railway Discord

---

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Backend API is accessible
- ✅ Frontend loads without errors
- ✅ Users can login
- ✅ Data persists across sessions
- ✅ All features work as expected
- ✅ No CORS errors
- ✅ Mobile responsive
- ✅ HTTPS enabled

---

## 🎉 You're Live!

Once deployed, share your app:
- 🌐 **Frontend**: `https://your-app.vercel.app`
- 🔌 **Backend**: `https://your-backend.onrender.com`
- 📚 **API Docs**: `https://your-backend.onrender.com/docs`

**Demo Credentials**:
- Admin: `admin@thryve.com` / `admin123`
- Manager: `manager@thryve.com` / `manager123`
- Employee: `employee@thryve.com` / `employee123`

---

**Need Help?** Check the troubleshooting section or review the platform-specific documentation.

**Good luck with your deployment! 🚀**
