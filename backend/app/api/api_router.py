from fastapi import APIRouter

from app.api.routes import auth, goals, checkins, approvals, analytics, admin, audit, health, reports

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["Auth"])
router.include_router(goals.router, prefix="/goals", tags=["Goals"])
router.include_router(checkins.router, prefix="/checkins", tags=["Check-ins"])
router.include_router(approvals.router, prefix="/approvals", tags=["Approvals"])
router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
router.include_router(admin.router, prefix="/admin", tags=["Admin"])
router.include_router(audit.router, prefix="/audit", tags=["Audit"])
router.include_router(health.router, prefix="/health", tags=["Health"])
router.include_router(reports.router, prefix="/reports", tags=["Reports"])
