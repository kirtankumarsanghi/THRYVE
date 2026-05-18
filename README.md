# THRYVE

Enterprise Workforce Goal Management and Performance Intelligence Platform

THRYVE is a full-stack enterprise performance management platform designed to help organizations manage goals, approvals, quarterly performance tracking, governance workflows, and analytics through a unified system.

The platform demonstrates production-style architecture with:
- Role-based workflows
- Real-time analytics
- Governance controls
- JWT authentication
- Audit logging
- Multi-role dashboards
- Enterprise workflow orchestration

THRYVE was built as a scalable workforce management solution suitable for hackathons, enterprise workflow demonstrations, and full-stack system design showcases.

---

# Table of Contents

1. Problem Statement
2. Solution Overview
3. Core Features
4. User Roles
5. System Architecture
6. Technology Stack
7. Backend Architecture
8. Frontend Architecture
9. Database Design
10. Workflow Overview
11. API Overview
12. Local Development Setup
13. Demo Credentials
14. Testing
15. Deployment
16. Security Features
17. Analytics & Governance
18. Future Improvements
19. License

---

# Problem Statement

Organizations often manage employee goals using spreadsheets, disconnected tools, or manual reporting systems. These approaches create operational challenges such as:

- No centralized source of truth
- Slow manager approval cycles
- Weak governance and accountability
- Limited organizational visibility
- Inconsistent performance tracking
- Poor auditability
- Lack of analytics-driven decision-making

THRYVE addresses these problems by providing a centralized enterprise-grade goal management and workforce analytics platform.

---

# Solution Overview

THRYVE provides an integrated multi-role workflow platform where:

- Employees create and track goals
- Managers review and approve submissions
- Administrators manage governance and analytics
- Organizations gain visibility into workforce performance

The platform combines:
- Goal lifecycle management
- Approval workflows
- Quarterly check-ins
- Progress tracking
- Organization analytics
- Audit logging
- Governance controls

All actions are authenticated, persisted in the database, and exposed through secure APIs.

---

# Core Features

## Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Secure password hashing with bcrypt
- Protected frontend routes
- Protected backend APIs
- Session persistence

Supported roles:
- Employee
- Manager
- Admin

---

## Goal Management

Employees can:
- Create goals
- Edit goals
- Track progress
- Submit quarterly updates
- Monitor completion status

Goal features:
- Goal ownership
- Weightage validation
- Quarterly tracking
- Status lifecycle management
- Goal locking after approval

Validation rules:
- Maximum 8 goals per employee
- Minimum 10% weightage per goal
- Total weightage cannot exceed 100%

---

## Quarterly Check-ins

The system supports periodic performance updates through:
- Quarterly submissions
- Achievement tracking
- Progress calculations
- Timeline monitoring
- Dynamic completion percentages

Supported UoM calculation types:
- Min
- Max
- Zero
- Timeline

---

## Manager Approval Workflow

Managers can:
- Review employee goals
- Approve or reject submissions
- Add review comments
- Monitor team performance
- View pending approval queues

Workflow:

```text
Employee Creates Goal
        ↓
Manager Reviews Goal
        ↓
Approve / Reject
        ↓
Approved Goals Become Locked
```

---

## Analytics & Dashboards

THRYVE provides real-time analytics dashboards including:
- Goal completion metrics
- Team analytics
- Department performance
- Quarterly trends
- Progress tracking
- KPI dashboards
- Organization summaries

Dashboards are powered by live backend APIs and database-driven analytics.

---

## Governance & Audit System

Administrators can:
- Unlock approved goals
- Monitor audit logs
- Review organization analytics
- Manage departments
- Track system activity

Audit logs track:
- Goal creation
- Goal updates
- Approvals/rejections
- Check-ins
- Governance actions
- User activity

---

# User Roles

## Employee

Employees can:
- Create goals
- Update goals
- Submit check-ins
- Track personal progress
- View analytics

---

## Manager

Managers can:
- Approve/reject goals
- Review team performance
- Monitor employee progress
- Access team analytics

---

## Admin

Admins can:
- Access governance dashboards
- View audit logs
- Unlock goals
- Manage departments
- Monitor organization-wide analytics

---

# System Architecture

```text
Frontend (React + Vite)
        ↓
Axios API Layer
        ↓
FastAPI Backend
        ↓
JWT Authentication
        ↓
Business Logic Services
        ↓
SQLAlchemy ORM
        ↓
SQLite Database
```

---

# Technology Stack

## Frontend

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Framer Motion

---

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Python-Jose
- Passlib (bcrypt)
- Uvicorn

---

# Backend Architecture

```text
backend/app/
│
├── api/routes/
│   ├── auth.py
│   ├── goals.py
│   ├── approvals.py
│   ├── analytics.py
│   ├── checkins.py
│   └── admin.py
│
├── core/
│   ├── database.py
│   ├── security.py
│   ├── dependencies.py
│   └── config.py
│
├── models/
│   ├── user.py
│   ├── goal.py
│   ├── checkin.py
│   └── audit.py
│
├── schemas/
│   ├── auth.py
│   ├── goal.py
│   ├── checkin.py
│   └── analytics.py
│
├── services/
│   ├── auth_service.py
│   ├── goal_service.py
│   ├── approval_service.py
│   ├── analytics_service.py
│   └── audit_service.py
│
└── utils/
    ├── validators.py
    ├── scoring.py
    └── csv_export.py
```

---

# Frontend Architecture

```text
frontend/src/
│
├── api/
├── components/
├── context/
├── layouts/
├── pages/
├── routes/
├── hooks/
└── utils/
```

---

# Database Design

Core entities:
- Users
- Goals
- Checkins
- AuditLogs
- Departments

Relationships:

```text
User
 └── Goals
       └── Checkins
```

---

# Workflow Overview

## Employee Workflow

```text
Login
   ↓
Create Goals
   ↓
Submit Goals
   ↓
Quarterly Check-ins
   ↓
Track Progress
```

---

## Manager Workflow

```text
Login
   ↓
Review Goals
   ↓
Approve / Reject
   ↓
Monitor Team Analytics
```

---

## Admin Workflow

```text
Login
   ↓
Governance Dashboard
   ↓
Audit Logs
   ↓
Unlock Goals
   ↓
Organization Analytics
```

---

# API Overview

## Authentication

```http
POST /auth/register
POST /auth/login
GET  /auth/me
```

---

## Goals

```http
GET    /goals
POST   /goals
PUT    /goals/{id}
DELETE /goals/{id}
```

---

## Approvals

```http
GET /approvals/pending
PUT /approvals/{id}/approve
PUT /approvals/{id}/reject
```

---

## Check-ins

```http
POST /checkins/{goal_id}
GET  /checkins/{goal_id}
```

---

## Analytics

```http
GET /analytics/overview
GET /analytics/team
GET /analytics/departments
GET /analytics/trends
```

---

## Admin

```http
GET /admin/audit-logs
PUT /admin/unlock-goal/{id}
GET /admin/org-analytics
```

---

# Local Development Setup

## Prerequisites

- Python 3.9+
- Node.js 18+
- npm
- pip

---

# Backend Setup

```bash
cd backend

python -m venv venv

# Windows
.\venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:
```text
http://127.0.0.1:8000
```

Swagger Docs:
```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:
```text
http://localhost:5173
```

---

# Demo Credentials

## Employee

```text
email: employee@thryve.com
password: employee123
```

---

## Manager

```text
email: manager@thryve.com
password: manager123
```

---

## Admin

```text
email: admin@thryve.com
password: admin123
```

---

# Testing

Backend test scripts:
- test_auth.py
- test_goals.py
- test_departments.py
- test_full_system.py
- test_phase4.py

Run tests:

```bash
cd backend

python test_full_system.py
```

---

# Deployment

Recommended deployment architecture:

## Frontend
- Vercel

## Backend
- Render
- Railway
- Fly.io

---

# Environment Variables

## Frontend

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## Backend

```env
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

---

# Security Features

- JWT authentication
- Role-based authorization
- Password hashing
- Protected APIs
- Request validation
- ORM-based SQL protection
- Route guards
- Session persistence

---

# Analytics & Governance

THRYVE includes:
- Real-time analytics
- Governance workflows
- Audit visibility
- Department tracking
- Team performance insights
- KPI dashboards
- Quarterly reporting

---

# Future Improvements

Potential production enhancements:
- PostgreSQL migration
- Redis caching
- WebSocket notifications
- CI/CD pipelines
- Kubernetes deployment
- Advanced observability
- SSO integration
- AI-powered recommendations

---

# License

MIT License

---

# Project Summary

THRYVE demonstrates:
- Full-stack engineering
- Enterprise workflow design
- Multi-role architecture
- Workforce analytics
- Governance systems
- Modern frontend engineering
- Scalable backend architecture

The platform is designed to showcase production-style software engineering practices in a hackathon-ready enterprise application.
