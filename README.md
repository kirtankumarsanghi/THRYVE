# 🎯 THRYVE - Enterprise Goal Management Platform

> **Align. Achieve. Thryve.**

A full-stack, enterprise-grade workforce goal management and analytics platform built with React and FastAPI.

![Status](https://img.shields.io/badge/status-production--ready-success)
![Phase](https://img.shields.io/badge/phase-5%20complete-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🌟 Overview

Thryve is a comprehensive goal management system that enables organizations to:
- Set and track quarterly goals
- Manage approval workflows
- Monitor team performance
- Generate real-time analytics
- Maintain audit compliance
- Export reports

Built for **hackathons** and **production** use.

---

## ✨ Key Features

### 🎯 Goal Management
- Create, update, and track goals
- Quarterly goal cycles (Q1-Q4)
- Strategic area alignment
- Weightage validation (max 100%)
- Multiple UOM types (Min, Max, Timeline, Zero)
- Goal locking after approval

### 👥 Multi-Role System
- **Employee**: Create goals, submit check-ins, view analytics
- **Manager**: Approve/reject goals, view team performance
- **Admin**: System governance, audit logs, user management

### 📊 Real-Time Analytics
- Organization overview metrics
- Team performance dashboards
- Department comparisons
- Quarterly trend analysis
- Employee rankings (leaderboard)
- Strategic area breakdown

### 🔒 Enterprise Features
- JWT authentication
- Role-based access control
- Complete audit logging
- Admin governance (goal unlocking)
- CSV export capabilities
- System health monitoring
- **🆕 Department management (full CRUD)**
- **🆕 Redesigned admin dashboard with live data**
- **🆕 Interactive data visualizations**
- **🆕 Real-time system monitoring**

### 📋 Compliance & Audit
- Track every action
- Complete audit trail
- Goal history tracking
- User activity logs
- Compliance-ready reports

---

## 🚀 Deployment

### Quick Deploy (15 minutes)
Deploy your app for **FREE** using Render + Vercel:

1. **Read**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) ⭐ Start here!
2. **Follow**: Step-by-step instructions
3. **Result**: Live app in 15 minutes

### Comprehensive Guide
For detailed deployment options and troubleshooting:
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete guide with 3 options
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist
- **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Overview and comparison

### Deployment Options
1. **Render + Vercel** (Recommended, Free)
2. **Railway + Vercel** ($5/month, Faster)
3. **Heroku + Vercel** (Traditional, $7+/month)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip and npm

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python seed_demo_data.py
python -m uvicorn app.main:app --reload
```

Backend runs on: `http://127.0.0.1:8000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 3. Login

**Demo Credentials:**
- Employee: `employee@thryve.com` / `employee123`
- Manager: `manager@thryve.com` / `manager123`
- Admin: `admin@thryve.com` / `admin123`

---

## 📚 Documentation

### Core Documentation
- **[Quick Start Guide](./QUICK_START.md)** - Get running in 5 minutes
- **[Phase 4 Complete](./PHASE_4_COMPLETE.md)** - Analytics & Audit features
- **[Phase 5 Complete](./PHASE_5_COMPLETE.md)** - Frontend-Backend integration
- **[API Reference](./API_REFERENCE_PHASE4.md)** - Complete API documentation
- **[Implementation Guide](./PHASE_4_IMPLEMENTATION_GUIDE.md)** - Code examples

### 🆕 Admin Features Documentation
- **[Admin Section Summary](./ADMIN_SECTION_SUMMARY.md)** ⭐ - Start here for admin features
- **[Admin Features Complete](./ADMIN_FEATURES_COMPLETE.md)** - Complete implementation details
- **[Department Management](./DEPARTMENT_MANAGEMENT_FEATURE.md)** - CRUD operations guide
- **[Dashboard Upgrade](./ADMIN_DASHBOARD_UPGRADE.md)** - Redesigned dashboard details
- **[Dashboard Comparison](./ADMIN_DASHBOARD_COMPARISON.md)** - Before/After comparison
- **[Dashboard Quick Start](./ADMIN_DASHBOARD_QUICKSTART.md)** - Testing guide

---

## 🏗️ Architecture

### Tech Stack

**Backend:**
- FastAPI (Python web framework)
- SQLAlchemy (ORM)
- SQLite (Database)
- JWT (Authentication)
- Pydantic (Validation)

**Frontend:**
- React 18
- Vite (Build tool)
- React Router (Routing)
- Axios (HTTP client)
- Tailwind CSS (Styling)
- Recharts (Charts)
- React Hot Toast (Notifications)

### System Architecture

```
┌─────────────────┐
│  React Frontend │
│   (Port 5173)   │
└────────┬────────┘
         │ HTTP/REST
         │ JWT Auth
┌────────▼────────┐
│  FastAPI Backend│
│   (Port 8000)   │
└────────┬────────┘
         │ SQLAlchemy
┌────────▼────────┐
│ SQLite Database │
│   (thryve.db)   │
└─────────────────┘
```

---

## 📊 Database Schema

### Core Tables

**users**
- User authentication and profile
- Roles: employee, manager, admin
- Department assignment

**goals**
- Goal details and targets
- Approval workflow state
- Progress tracking
- Locking mechanism

**checkins**
- Quarterly progress updates
- Achievement tracking
- Status management

**audit_logs**
- Complete action history
- Compliance tracking
- User activity logs

---

## 🎯 User Flows

### Employee Flow
1. Login → Dashboard
2. Create Goal → Submit for Approval
3. Wait for Manager Approval
4. Submit Quarterly Check-ins
5. Track Progress
6. View Analytics

### Manager Flow
1. Login → Dashboard
2. View Pending Approvals
3. Review Goal Details
4. Approve/Reject Goals
5. Monitor Team Performance
6. View Team Analytics

### Admin Flow
1. Login → **Redesigned Dashboard** 🆕
2. View **System Health & Live Metrics** 🆕
3. **Manage Departments (CRUD)** 🆕
4. Manage Users & Roles
5. Unlock Goals (Governance)
6. View **Real-time Audit Logs** 🆕
7. **Interactive Analytics & Charts** 🆕
8. Export Reports

---

## 🔐 Security Features

- **Authentication**: JWT tokens with expiration
- **Authorization**: Role-based access control
- **Password Security**: Bcrypt hashing
- **Input Validation**: Pydantic schemas
- **SQL Injection**: SQLAlchemy ORM protection
- **CORS**: Configured for development/production
- **Audit Logging**: Complete action tracking

---

## 📈 Analytics Features

### Organization Metrics
- Total goals, completed goals, pending goals
- Average progress, completion rate
- Employee and department counts

### Team Analytics
- Individual employee performance
- Quarterly breakdown per employee
- Completion rate rankings
- Department comparisons

### Trends & Insights
- Quarterly trend analysis (Q1-Q4)
- Strategic area distribution
- Approval pipeline health
- Goal status distribution

---

## 🛠️ API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Current user

### Goals
- `GET /goals` - List user goals
- `POST /goals` - Create goal
- `PUT /goals/{id}` - Update goal
- `GET /goals/{id}` - Get goal details

### Approvals
- `GET /approvals/pending` - Pending approvals
- `PUT /approvals/{id}/approve` - Approve goal
- `PUT /approvals/{id}/reject` - Reject goal

### Analytics
- `GET /analytics/overview` - Organization metrics
- `GET /analytics/team` - Team performance
- `GET /analytics/departments` - Department analytics
- `GET /analytics/trends` - Quarterly trends

### Admin
- `PUT /admin/goals/{id}/unlock` - Unlock goal
- `GET /admin/audit-logs` - Audit logs
- `GET /admin/system-health` - System health
- `GET /admin/export/*` - CSV exports
- **🆕 `GET /admin/departments`** - List departments with stats
- **🆕 `POST /admin/departments`** - Create department
- **🆕 `PUT /admin/departments/{id}`** - Update department
- **🆕 `DELETE /admin/departments/{id}`** - Delete department
- **🆕 `GET /admin/org-analytics`** - Comprehensive analytics

**Full API docs:** `http://127.0.0.1:8000/docs` (Swagger UI)

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
python test_phase4.py
```

### Manual Testing
1. Run seed script to create demo data
2. Test each user role (employee, manager, admin)
3. Verify all CRUD operations
4. Check audit logs are created
5. Test analytics calculations
6. Verify CSV exports

---

## 📦 Project Structure

```
thryve/
├── backend/
│   ├── app/
│   │   ├── api/routes/      # API endpoints
│   │   ├── core/            # Config, security, database
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utilities
│   ├── seed_demo_data.py    # Demo data seeder
│   ├── test_phase4.py       # Backend tests
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api/            # API integration layer
│   │   ├── components/     # React components
│   │   ├── context/        # React contexts
│   │   ├── pages/          # Page components
│   │   ├── layouts/        # Layout components
│   │   └── routes/         # Route configuration
│   ├── .env                # Environment variables
│   └── package.json        # Node dependencies
│
└── docs/
    ├── QUICK_START.md
    ├── PHASE_4_COMPLETE.md
    ├── PHASE_5_COMPLETE.md
    └── API_REFERENCE_PHASE4.md
```

---

## 🎨 Screenshots

### Dashboard
Real-time metrics and analytics

### Goals Management
Create, track, and manage goals

### Approval Workflow
Manager approval interface

### Analytics
Team performance and trends

### Admin Governance
System management and audit logs

---

## 🚀 Deployment

### Backend (Production)
1. Switch to PostgreSQL
2. Set environment variables
3. Configure CORS for production domain
4. Use production ASGI server (Gunicorn + Uvicorn)
5. Set up SSL/TLS

### Frontend (Production)
1. Build production bundle: `npm run build`
2. Deploy to CDN or static hosting
3. Update API URL in environment
4. Configure proper CORS

### Recommended Platforms
- **Backend**: Railway, Render, AWS, Heroku
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Database**: PostgreSQL on Railway, AWS RDS

---

## 🤝 Contributing

This is a hackathon/demo project. Feel free to:
- Fork and modify
- Use as learning material
- Build upon for your projects
- Submit issues and PRs

---

## 📄 License

MIT License - feel free to use for any purpose

---

## 🏆 Achievements

### Phase 4: Analytics & Audit ✅
- Real-time analytics engine
- Complete audit logging system
- Admin governance controls
- CSV export capabilities

### Phase 5: Full Integration ✅
- Frontend-Backend integration
- Real authentication system
- Live database connection
- Production-ready architecture

---

## 🎯 Use Cases

- **Startups**: Track team OKRs and goals
- **Enterprises**: Workforce performance management
- **Hackathons**: Showcase full-stack skills
- **Learning**: Study modern web architecture
- **Portfolio**: Demonstrate enterprise development

---

## 📞 Support

### Documentation
- Quick Start Guide
- API Reference
- Implementation Guide
- Phase Completion Docs

### Common Issues
See `QUICK_START.md` troubleshooting section

---

## 🌟 Features Highlight

✅ Real JWT Authentication  
✅ Role-Based Access Control  
✅ Real-Time Analytics  
✅ Complete Audit Trail  
✅ Admin Governance  
✅ CSV Export System  
✅ Approval Workflows  
✅ Progress Tracking  
✅ Team Management  
✅ System Health Monitoring  
✅ **🆕 Department Management (Full CRUD)**  
✅ **🆕 Modern Admin Dashboard**  
✅ **🆕 Interactive Charts & Visualizations**  
✅ **🆕 Live Data Monitoring**  
✅ **🆕 Real-time Activity Feed**  

---

## 🎉 Status

**Phase 5 Complete** - Production Ready

This is a fully functional, enterprise-grade application ready for:
- Demo presentations
- Hackathon submissions
- Portfolio showcases
- Production deployment (with minor config)

---

## 🚀 Get Started Now

```bash
# Clone the repo
git clone <your-repo-url>

# Follow Quick Start Guide
See QUICK_START.md

# Start building!
```

---

**Built with ❤️ for enterprise goal management**

*Align. Achieve. Thryve.*
