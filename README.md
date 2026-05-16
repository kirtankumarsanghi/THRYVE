# THRYVE
### Align. Achieve. Thryve.

An enterprise-grade Employee Goal Setting & Performance Tracking Platform built for AtomQuest Hackathon 1.0.

---

# Overview

THRYVE is a modern workforce execution and goal management platform that helps organizations align employee goals with business strategy, streamline quarterly performance reviews, and improve visibility across teams.

The platform replaces fragmented workflows based on spreadsheets, emails, and manual tracking with a centralized digital ecosystem.

Employees can create goals, managers can approve and monitor progress, and administrators can oversee governance, analytics, and organizational performance.

---

# Problem Statement

Organizations often struggle with:

- Disconnected goal tracking systems
- Lack of visibility into employee progress
- Manual appraisal and review cycles
- Poor alignment between business objectives and employee goals
- No real-time analytics or accountability
- Difficulty tracking quarterly achievements
- Limited governance and auditability

THRYVE solves these challenges by providing:

- Goal creation and approval workflows
- Quarterly achievement tracking
- Real-time analytics dashboards
- Role-based access control
- Audit trails and governance
- Team and organization-level visibility

---

# Key Features

## Employee Features

- Create and manage annual goals
- Define targets, weightage, and measurement units
- Submit goals for manager approval
- Quarterly progress updates and achievement tracking
- Goal progress analytics
- Check-in comments and collaboration
- Notifications and reminders

---

## Manager Features

- Team performance dashboard
- Goal approval and review workflows
- Return goals for rework
- Quarterly employee check-ins
- Team analytics and KPI monitoring
- Structured review comments
- Goal locking after approval

---

## Admin / HR Features

- Governance center
- User and department management
- Review cycle management
- Audit logs and activity tracking
- Goal unlock capability
- Organization-wide analytics
- CSV export and reporting

---

# Core Functionalities

## Goal Creation & Validation

Employees can create goals with:

- Goal title and description
- Strategic thrust area
- Unit of Measurement (UoM)
- Target values
- Weightage allocation
- Quarterly milestones

### Validation Rules

- Maximum 8 goals per employee
- Minimum 10% weightage per goal
- Total weightage must equal exactly 100%

---

## Quarterly Check-ins

Employees can submit quarterly updates:

- Planned vs Actual achievement
- Progress status updates
- Achievement commentary
- Quarterly tracking history

### Statuses

- Not Started
- On Track
- Completed
- At Risk

---

## Progress Calculation Engine

THRYVE includes a dynamic progress scoring engine supporting multiple measurement models.

### Supported UoM Types

| UoM Type | Description | Formula |
|---|---|---|
| Min | Higher is better | Achievement ÷ Target |
| Max | Lower is better | Target ÷ Achievement |
| Timeline | Deadline-based completion | Completion date vs Deadline |
| Zero | Zero = Success | If actual = 0 → 100% |

---

## Approval Workflow

Managers can:

- Approve goals
- Reject goals
- Return goals for rework
- Add structured feedback
- Lock approved goals

Approved goals cannot be modified without admin intervention.

---

## Analytics & Insights

The platform includes:

- KPI dashboards
- Goal completion analytics
- Quarterly trend analysis
- Department heatmaps
- Team performance charts
- AI-powered insights
- Progress forecasting

---

## Governance & Audit Logs

THRYVE maintains audit trails for:

- Goal modifications
- Approval actions
- Progress updates
- Unlock operations
- Review comments
- User actions

The audit system tracks:

- Who changed what
- Old vs new values
- Timestamp of changes

---

# User Roles

## Employee

Capabilities:

- Create and edit goals
- Submit goals
- Update quarterly achievements
- View analytics and progress
- Participate in check-ins

---

## Manager

Capabilities:

- Review employee goals
- Approve/reject submissions
- Conduct quarterly reviews
- Track team performance
- Add review comments

---

## Admin / HR

Capabilities:

- Manage organization hierarchy
- Control review cycles
- Unlock goals
- Monitor governance
- View organization analytics
- Export reports

---

# Tech Stack

## Frontend

- React + Vite
- TailwindCSS
- React Router DOM
- Axios
- React Hook Form
- Zod
- Recharts
- Framer Motion
- Lucide React
- React Hot Toast

---

## Backend

- FastAPI
- SQLite
- SQLAlchemy
- JWT Authentication
- Passlib / bcrypt

---

## Deployment

- Frontend: Vercel
- Backend: Render

---

# Project Architecture

```txt
THRYVE/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│
└── README.md
```

---

# UI & Design Philosophy

THRYVE follows a premium enterprise SaaS design language inspired by:

- Linear
- Workday
- Stripe Dashboard
- Vercel
- Notion AI

### UI Highlights

- Dark futuristic theme
- Glassmorphism cards
- Neon accent highlights
- Smooth animations
- Analytics-heavy dashboards
- Responsive enterprise layouts

---

# Demo Workflow

## Employee Journey

1. Login as Employee
2. Create goals
3. Define targets and weightage
4. Submit goals for approval
5. Update quarterly achievements
6. Track analytics and progress

---

## Manager Journey

1. Login as Manager
2. Review pending goals
3. Approve or return goals
4. Conduct quarterly reviews
5. Monitor team analytics

---

## Admin Journey

1. Login as Admin
2. View governance dashboard
3. Manage review cycles
4. Monitor audit logs
5. Export reports and analytics

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/kirtankumarsanghi/THRYVE.git
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```txt
http://127.0.0.1:8000
```

---

# Future Enhancements

Potential future improvements:

- Microsoft Entra ID (Azure AD) integration
- Microsoft Teams notifications
- Email reminder workflows
- Real-time collaboration
- AI-generated performance insights
- Advanced escalation workflows
- Multi-organization support
- Cloud database integration

---

# Evaluation Alignment

| Criteria | Implementation |
|---|---|
| Functionality | End-to-end goal lifecycle |
| BRD Adherence | Validation + workflows implemented |
| User Experience | Premium responsive UI |
| Stability | Structured modular architecture |
| Bonus Features | Analytics, notifications, exports |
| Cost Optimization | SQLite + Vercel + Render |

---

# Why THRYVE Stands Out

THRYVE is not just a CRUD application.

It combines:

- Enterprise workflows
- Real-time analytics
- Goal governance
- Approval orchestration
- Workforce visibility
- Executive dashboards
- Modern SaaS UX

The platform is designed to feel production-ready and enterprise-grade.

---

# Team

Developed for AtomQuest Hackathon 1.0.

Built with a focus on:

- scalability
- usability
- enterprise architecture
- premium UI/UX
- workflow intelligence

---

# Repository

GitHub Repository:

https://github.com/kirtankumarsanghi/THRYVE

---

# License

This project is intended for educational and hackathon demonstration purposes.
