# 🚀 THRYVE - Quick Start Guide

## Get Up and Running in 5 Minutes

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- Git installed

---

## Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Seed demo data (creates users and sample goals)
python seed_demo_data.py

# Start backend server
python -m uvicorn app.main:app --reload
```

✅ Backend running on: **http://127.0.0.1:8000**

---

## Step 2: Frontend Setup (2 minutes)

```bash
# Open new terminal
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install

# Start frontend dev server
npm run dev
```

✅ Frontend running on: **http://localhost:5173**

---

## Step 3: Login & Explore (1 minute)

Open browser to: **http://localhost:5173**

### Demo Credentials:

**Employee Account:**
- Email: `employee@thryve.com`
- Password: `employee123`
- Access: Goals, Check-ins, Analytics

**Manager Account:**
- Email: `manager@thryve.com`
- Password: `manager123`
- Access: Team, Approvals, Analytics

**Admin Account:**
- Email: `admin@thryve.com`
- Password: `admin123`
- Access: Everything + Governance

---

## Quick Test Checklist

### ✅ Employee Flow
1. Login as employee
2. View dashboard (real data!)
3. Go to Goals → Create Goal
4. Fill form and submit
5. See success toast
6. Goal appears in list

### ✅ Manager Flow
1. Login as manager
2. Go to Approvals
3. See pending goals
4. Click "Approve" on a goal
5. See success toast
6. Goal disappears from pending

### ✅ Admin Flow
1. Login as admin
2. Go to Admin → Governance
3. View system health
4. Try unlocking a goal
5. View audit logs

### ✅ Analytics
1. Login as any role
2. Go to Analytics
3. See real charts with live data
4. Check quarterly trends
5. View employee rankings

---

## Troubleshooting

### Backend won't start?
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# If in use, kill the process or change port
python -m uvicorn app.main:app --reload --port 8001
```

### Frontend won't start?
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Login not working?
1. Make sure backend is running
2. Check you ran `seed_demo_data.py`
3. Try credentials exactly as shown
4. Check browser console for errors

### No data showing?
1. Verify backend is running on port 8000
2. Check `.env` file in frontend folder
3. Should have: `VITE_API_URL=http://127.0.0.1:8000`
4. Restart frontend if you changed .env

---

## What You Get

### ✅ Complete Features
- Real authentication (JWT)
- Goal management (CRUD)
- Approval workflow
- Quarterly check-ins
- Real-time analytics
- Audit logging
- Admin governance
- CSV exports
- Role-based access

### ✅ Demo Data
- 8 users (employees, managers, admin)
- 15-25 sample goals
- Various quarters (Q1-Q4)
- Different departments
- Sample check-ins
- Approval states

---

## API Documentation

Once backend is running, visit:
**http://127.0.0.1:8000/docs**

Interactive API documentation (Swagger UI) with:
- All endpoints listed
- Try it out functionality
- Request/response schemas
- Authentication testing

---

## Project Structure

```
thryve/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Config, security, database
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── seed_demo_data.py   # Demo data seeder
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api/           # API integration
│   │   ├── components/    # React components
│   │   ├── context/       # React contexts
│   │   ├── pages/         # Page components
│   │   └── routes/        # Route configuration
│   └── package.json       # Node dependencies
│
└── Documentation/
    ├── PHASE_4_COMPLETE.md
    ├── PHASE_5_COMPLETE.md
    └── QUICK_START.md (this file)
```

---

## Key Technologies

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database
- **SQLite** - Database (easy setup)
- **JWT** - Authentication
- **Pydantic** - Data validation

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Tailwind CSS** - Styling
- **Recharts** - Charts

---

## Next Steps

### For Development:
1. Explore the codebase
2. Read `PHASE_4_COMPLETE.md` for analytics features
3. Read `PHASE_5_COMPLETE.md` for integration details
4. Check `API_REFERENCE_PHASE4.md` for API docs

### For Demo:
1. Practice the user flows
2. Prepare talking points
3. Test all features
4. Have backup plan (screenshots)

### For Production:
1. Switch to PostgreSQL
2. Add environment variables
3. Set up proper authentication
4. Configure CORS properly
5. Add monitoring
6. Deploy to cloud

---

## Support

### Documentation:
- `PHASE_4_COMPLETE.md` - Analytics & Audit features
- `PHASE_5_COMPLETE.md` - Frontend-Backend integration
- `API_REFERENCE_PHASE4.md` - Complete API reference
- `PHASE_4_IMPLEMENTATION_GUIDE.md` - Implementation examples

### Common Issues:
1. **CORS errors**: Backend already configured for development
2. **Port conflicts**: Change ports in commands
3. **Module not found**: Run `pip install -r requirements.txt`
4. **npm errors**: Delete `node_modules` and reinstall

---

## Success Indicators

You'll know everything is working when:

✅ Backend shows: "INFO: Application startup complete"  
✅ Frontend shows: "Local: http://localhost:5173"  
✅ Login redirects to dashboard  
✅ Dashboard shows real data (not mock)  
✅ Creating goal shows success toast  
✅ Manager can see pending approvals  
✅ Analytics show real charts  
✅ No console errors  

---

## 🎉 You're Ready!

Your Thryve application is now running with:
- Real authentication
- Live database
- Complete workflows
- Enterprise features
- Production-ready architecture

**Go build something amazing! 🚀**

---

*For detailed documentation, see PHASE_4_COMPLETE.md and PHASE_5_COMPLETE.md*
