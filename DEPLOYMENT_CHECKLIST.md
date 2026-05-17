# 🚀 THRYVE - Deployment Checklist

## Pre-Deployment Checklist

---

## 📋 Development Environment Verification

### ✅ Backend Checks
- [ ] All tests pass (`python test_phase4.py`)
- [ ] No console errors in backend logs
- [ ] All API endpoints working
- [ ] Database migrations complete
- [ ] Audit logs being created
- [ ] CSV exports working
- [ ] CORS configured correctly
- [ ] Environment variables documented

### ✅ Frontend Checks
- [ ] No console errors
- [ ] All pages load correctly
- [ ] All API calls working
- [ ] Authentication flow works
- [ ] Protected routes working
- [ ] Toast notifications working
- [ ] Charts rendering correctly
- [ ] Responsive design verified

### ✅ Integration Checks
- [ ] Login flow works end-to-end
- [ ] Goal CRUD operations work
- [ ] Approval workflow works
- [ ] Check-ins work
- [ ] Analytics show real data
- [ ] Admin features work
- [ ] Audit logs work
- [ ] CSV exports work

---

## 🔧 Production Configuration

### Backend Configuration

#### 1. Environment Variables
Create `.env` file in backend:
```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# Security
SECRET_KEY=your-super-secret-key-here-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=https://your-frontend-domain.com

# Environment
ENVIRONMENT=production
DEBUG=False
```

#### 2. Database Migration
```bash
# Switch from SQLite to PostgreSQL
pip install psycopg2-binary

# Update database.py
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./thryve.db")

# Run migrations
python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"

# Seed production data (optional)
python seed_demo_data.py
```

#### 3. Security Updates
```python
# In app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ALLOWED_ORIGINS")],  # Specific origins only
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Add security headers
from fastapi.middleware.trustedhost import TrustedHostMiddleware
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["your-domain.com"])
```

#### 4. Production Server
```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend Configuration

#### 1. Environment Variables
Create `.env.production`:
```bash
VITE_API_URL=https://your-backend-api.com
VITE_ENV=production
```

#### 2. Build for Production
```bash
# Install dependencies
npm install

# Build production bundle
npm run build

# Test production build locally
npm run preview
```

#### 3. Optimize Build
```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
        },
      },
    },
  },
});
```

---

## 🌐 Deployment Options

### Option 1: Railway (Recommended - Easiest)

#### Backend Deployment
1. Create Railway account
2. New Project → Deploy from GitHub
3. Select backend folder
4. Add environment variables
5. Deploy

**Railway Configuration:**
```toml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
```

#### Frontend Deployment
1. New Project → Deploy from GitHub
2. Select frontend folder
3. Add environment variables
4. Deploy

**Railway Configuration:**
```toml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run preview -- --host 0.0.0.0 --port $PORT"
```

### Option 2: Vercel (Frontend) + Render (Backend)

#### Frontend on Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
```

#### Backend on Render
1. Create Render account
2. New Web Service
3. Connect GitHub repo
4. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

### Option 3: AWS (Advanced)

#### Backend on Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p python-3.9 thryve-backend

# Create environment
eb create thryve-backend-prod

# Deploy
eb deploy
```

#### Frontend on S3 + CloudFront
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Configure CloudFront distribution
# Point to S3 bucket
# Add custom domain
# Enable HTTPS
```

---

## 🗄️ Database Setup

### PostgreSQL Setup

#### Option 1: Railway PostgreSQL
1. Add PostgreSQL plugin in Railway
2. Copy connection string
3. Update backend environment variables

#### Option 2: AWS RDS
1. Create RDS PostgreSQL instance
2. Configure security groups
3. Get connection string
4. Update backend environment variables

#### Option 3: Supabase
1. Create Supabase project
2. Get PostgreSQL connection string
3. Update backend environment variables

### Database Migration
```bash
# Export from SQLite
sqlite3 thryve.db .dump > backup.sql

# Import to PostgreSQL
psql $DATABASE_URL < backup.sql

# Or use migration tool
pip install alembic
alembic init migrations
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

---

## 🔒 Security Checklist

### Backend Security
- [ ] SECRET_KEY is strong and unique
- [ ] Passwords are hashed (bcrypt)
- [ ] JWT tokens expire
- [ ] CORS configured for specific origins
- [ ] HTTPS enabled
- [ ] SQL injection prevention (SQLAlchemy)
- [ ] Input validation (Pydantic)
- [ ] Rate limiting configured
- [ ] Security headers added
- [ ] Debug mode disabled

### Frontend Security
- [ ] API URL uses HTTPS
- [ ] No sensitive data in localStorage
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Content Security Policy configured
- [ ] No API keys in code
- [ ] Environment variables used

---

## 📊 Monitoring Setup

### Backend Monitoring

#### Option 1: Sentry
```bash
pip install sentry-sdk

# In app/main.py
import sentry_sdk
sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0,
)
```

#### Option 2: New Relic
```bash
pip install newrelic

# Run with New Relic
NEW_RELIC_CONFIG_FILE=newrelic.ini newrelic-admin run-program uvicorn app.main:app
```

### Frontend Monitoring

#### Option 1: Sentry
```bash
npm install @sentry/react

// In main.jsx
import * as Sentry from "@sentry/react";
Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

#### Option 2: Google Analytics
```bash
npm install react-ga4

// In App.jsx
import ReactGA from "react-ga4";
ReactGA.initialize("your-ga-id");
```

---

## 🧪 Pre-Launch Testing

### Production Environment Tests
- [ ] Test on production URL
- [ ] Verify HTTPS works
- [ ] Test all user flows
- [ ] Check mobile responsiveness
- [ ] Test different browsers
- [ ] Verify API endpoints
- [ ] Check database connections
- [ ] Test authentication
- [ ] Verify email notifications (if added)
- [ ] Check error handling

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Images optimized
- [ ] Bundle size optimized
- [ ] Lighthouse score > 90

### Security Tests
- [ ] SSL certificate valid
- [ ] CORS working correctly
- [ ] Authentication secure
- [ ] No exposed secrets
- [ ] Rate limiting working

---

## 📝 Documentation Updates

### Update Documentation
- [ ] Update README with production URLs
- [ ] Update API documentation
- [ ] Document environment variables
- [ ] Add deployment instructions
- [ ] Update architecture diagrams
- [ ] Document monitoring setup

### Create User Guides
- [ ] Admin user guide
- [ ] Manager user guide
- [ ] Employee user guide
- [ ] Troubleshooting guide

---

## 🚀 Launch Checklist

### Pre-Launch (1 week before)
- [ ] All features tested
- [ ] Documentation complete
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Rollback plan ready
- [ ] Team trained

### Launch Day
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Verify all services running
- [ ] Test critical paths
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Announce launch

### Post-Launch (1 week after)
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Optimize slow queries
- [ ] Update documentation

---

## 🔄 Maintenance Plan

### Daily
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Review user feedback

### Weekly
- [ ] Database backup
- [ ] Security updates
- [ ] Performance review
- [ ] Bug fixes

### Monthly
- [ ] Dependency updates
- [ ] Security audit
- [ ] Performance optimization
- [ ] Feature planning

---

## 📊 Success Metrics

### Technical Metrics
- Uptime: > 99.9%
- Response time: < 500ms
- Error rate: < 0.1%
- Page load: < 3 seconds

### Business Metrics
- Active users
- Goals created
- Approval rate
- Completion rate
- User satisfaction

---

## 🆘 Rollback Plan

### If Deployment Fails

#### Backend Rollback
```bash
# Railway
railway rollback

# Render
# Use Render dashboard to rollback

# AWS
eb deploy --version previous-version
```

#### Frontend Rollback
```bash
# Vercel
vercel rollback

# Netlify
# Use Netlify dashboard to rollback
```

### Emergency Contacts
- DevOps Lead: [contact]
- Backend Lead: [contact]
- Frontend Lead: [contact]
- Database Admin: [contact]

---

## ✅ Final Verification

Before going live, verify:

- [ ] All environment variables set
- [ ] Database connected and migrated
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Authentication working
- [ ] All features functional
- [ ] Monitoring active
- [ ] Backups configured
- [ ] Documentation updated
- [ ] Team notified

---

## 🎉 You're Ready to Deploy!

Once all checkboxes are complete:

✅ Backend is production-ready  
✅ Frontend is production-ready  
✅ Database is configured  
✅ Security is enabled  
✅ Monitoring is active  
✅ Documentation is complete  

**Deploy with confidence! 🚀**

---

## 📞 Support Resources

- **Documentation:** See all .md files in project root
- **API Docs:** `https://your-api.com/docs`
- **Monitoring:** Sentry/New Relic dashboard
- **Database:** Railway/Render dashboard
- **Hosting:** Vercel/Netlify dashboard

---

**Deployment Status:** Ready for Production ✅

*Good luck with your launch! 🎊*
