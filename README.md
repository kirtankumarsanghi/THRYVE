# THRYVE - Enterprise Goal Management Platform

THRYVE is a full-stack workforce goal management system designed to demonstrate production-style architecture, role-based workflows, and analytics-driven decision support in a hackathon setting.

The platform helps organizations move from static goal setting to active execution management by combining:
- Goal planning and ownership
- Approval and governance workflows
- Progress tracking and check-ins
- Role-specific dashboards
- Compliance and audit visibility

## Problem Statement

In many teams, goals are documented in spreadsheets or disconnected tools. This creates common issues:
- No single source of truth for current goal status
- Slow and inconsistent manager approvals
- Limited accountability across departments
- Poor visibility into organization-wide performance trends
- Weak auditability of who changed what and when

THRYVE addresses these issues with a unified platform and clear role-based responsibilities.

## Solution Overview

THRYVE provides three integrated user experiences:
- Employee workspace for creating and tracking goals
- Manager workspace for reviews, approvals, and team performance
- Admin workspace for governance, user oversight, and organization analytics

Every major action is backed by authenticated API calls and persisted in the backend database, enabling end-to-end traceability.

## Key Features

## 1) Authentication and Access Control
- JWT-based authentication for secure session management
- Role-based authorization (`employee`, `manager`, `admin`)
- Route protection in frontend and role checks in backend
- Token-aware API client with centralized request handling

## 2) Goal Lifecycle Management
- Goal creation with structured metadata
- Goal updates and progress management
- Check-in support for periodic progress reporting
- Status-aware flow from creation to approval outcomes
- Historical visibility through audit-related endpoints

## 3) Manager Approval Workflow
- Queue of pending goal approvals
- Approve/reject actions tied to specific goals
- Team-level visibility on progress and completion posture
- Faster review loop between individual contributors and leadership

## 4) Admin Governance and Operations
- Department management (create, read, update, delete)
- User and organization-level oversight
- Governance actions (including goal unlock controls)
- System health visibility and admin audit views

## 5) Analytics and Reporting
- Organization overview metrics
- Team and department-level analytics
- Trend-oriented summaries for progress and completion
- Dashboard views for fast decision-making during demos

## Role-Based User Flows

## Employee Flow
1. Login using employee credentials.
2. Create goals aligned with role/team expectations.
3. Submit updates through check-ins.
4. Track progress and status from dashboard views.

## Manager Flow
1. Login using manager credentials.
2. Review submitted goals from team members.
3. Approve/reject goals with governance context.
4. Monitor team performance metrics.

## Admin Flow
1. Login using admin credentials.
2. Manage departments and oversight controls.
3. Review organization metrics and audit signals.
4. Perform governance operations when exceptions arise.

## Technology Stack

## Frontend
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS
- Recharts

## Backend
- FastAPI
- SQLAlchemy
- Pydantic
- JWT (`python-jose`)
- SQLite for local development (with production migration path)

## Architecture and Data Flow

1. User authenticates through the React frontend.
2. Frontend sends credential request to FastAPI (`/auth/login`).
3. Backend validates user and returns JWT token + user profile.
4. Frontend stores token and sends it in subsequent API requests.
5. Role-based pages load data via protected endpoints.
6. Business actions (goal create/update/approve) persist in DB.
7. Analytics endpoints aggregate and return dashboard metrics.

## Project Structure

```text
thryve/
+-- backend/
¦   +-- app/
¦   ¦   +-- api/routes/      # HTTP endpoints by domain
¦   ¦   +-- core/            # Config, DB session, security
¦   ¦   +-- models/          # SQLAlchemy models
¦   ¦   +-- schemas/         # Pydantic request/response schemas
¦   ¦   +-- services/        # Business logic layer
¦   ¦   +-- utils/           # Shared helpers/utilities
¦   +-- seed_demo_data.py    # Demo user/data seed script
¦   +-- seed_departments.py  # Department seeding utility
¦   +-- requirements.txt
¦   +-- requirements-prod.txt
+-- frontend/
¦   +-- src/
¦   ¦   +-- api/             # API client and endpoint wrappers
¦   ¦   +-- components/       # Reusable UI units
¦   ¦   +-- context/          # Auth and app state contexts
¦   ¦   +-- layouts/          # Role-specific layout shells
¦   ¦   +-- pages/            # Screen-level pages
¦   +-- package.json
¦   +-- vite.config.js
¦   +-- vercel.json
+-- README.md
```

## Local Development Setup

## Prerequisites
- Python 3.8+
- Node.js 16+
- pip and npm

## Step 1: Start Backend

```bash
cd backend
pip install -r requirements.txt
python seed_demo_data.py
python -m uvicorn app.main:app --reload
```

Backend URLs:
- API root: `http://127.0.0.1:8000`
- Swagger docs: `http://127.0.0.1:8000/docs`

## Step 2: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:
- `http://localhost:5173`

## Demo Credentials

- Employee: `employee@thryve.com` / `employee123`
- Manager: `manager@thryve.com` / `manager123`
- Admin: `admin@thryve.com` / `admin123`

## API Reference Snapshot

## Authentication
- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`

## Goals
- `GET /goals`
- `POST /goals`
- `PUT /goals/{id}`
- `GET /goals/{id}`

## Approvals
- `GET /approvals/pending`
- `PUT /approvals/{id}/approve`
- `PUT /approvals/{id}/reject`

## Analytics
- `GET /analytics/overview`
- `GET /analytics/team`
- `GET /analytics/departments`
- `GET /analytics/trends`

## Admin
- `GET /admin/system-health`
- `GET /admin/audit-logs`
- `PUT /admin/goals/{id}/unlock`
- `GET /admin/departments`
- `POST /admin/departments`
- `PUT /admin/departments/{id}`
- `DELETE /admin/departments/{id}`

## Testing

Available backend test scripts include:
- `test_auth.py`
- `test_goals.py`
- `test_departments.py`
- `test_full_system.py`
- `test_phase4.py`

Example run:

```bash
cd backend
python test_phase4.py
```

## Deployment Guidance

THRYVE is built for split deployment:
- Frontend: Vercel (static build)
- Backend: Render, Railway, or other Python hosting

Critical frontend environment variable:
- `VITE_API_URL=<your-backend-base-url>`

Recommended production checks:
1. Confirm backend CORS includes frontend domain.
2. Verify all auth and protected routes function after deploy.
3. Ensure frontend SPA routing fallback is enabled in host config.
4. Validate demo credentials in production database.

## Hackathon Evaluation Notes

This project is suitable for judging across multiple dimensions:

- Product thinking: clear problem-solution fit
- Technical depth: full-stack integration with auth and RBAC
- Engineering quality: modular backend services and organized frontend layers
- Demo readiness: role-switchable workflows and visible analytics impact

Suggested live demo sequence:
1. Employee creates/updates a goal.
2. Manager reviews and approves from pending queue.
3. Admin verifies governance/analytics and department controls.
4. Show API docs and endpoint-backed data consistency.

## Limitations and Future Improvements

Current baseline:
- SQLite for local development convenience
- Demo-seeded credentials for evaluator onboarding

Planned production hardening:
- PostgreSQL as primary production DB
- Extended test automation and CI checks
- Observability enhancements (structured logs/metrics)
- Optional SSO and enterprise identity integration

## License

MIT
