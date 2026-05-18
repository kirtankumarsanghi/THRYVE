"""
Seed data endpoint for initial database setup
This endpoint should be called once after deployment to populate the database
"""
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.models.department import Department
from app.core.security import get_password_hash
import os

router = APIRouter()

# Secret key for seed endpoint (set in environment variables)
SEED_SECRET = os.getenv("SEED_SECRET", "change-this-secret-key-in-production")


@router.post("/seed-database")
async def seed_database(
    x_seed_secret: str = Header(...),
    db: Session = Depends(get_db)
):
    """
    Seed the database with initial data
    Requires X-Seed-Secret header for security
    """
    # Verify secret key
    if x_seed_secret != SEED_SECRET:
        raise HTTPException(status_code=403, detail="Invalid seed secret")
    
    try:
        # Check if data already exists
        existing_users = db.query(User).count()
        if existing_users > 0:
            return {
                "status": "skipped",
                "message": "Database already contains data. Skipping seed.",
                "existing_users": existing_users
            }
        
        # Seed Departments
        departments_data = [
            {"name": "Engineering", "description": "Software development and technical operations"},
            {"name": "Product", "description": "Product management and strategy"},
            {"name": "Design", "description": "UX/UI design and research"},
            {"name": "Marketing", "description": "Marketing and growth initiatives"},
            {"name": "Sales", "description": "Sales and business development"},
            {"name": "Customer Success", "description": "Customer support and success"},
            {"name": "Operations", "description": "Business operations and administration"},
            {"name": "Finance", "description": "Financial planning and accounting"},
        ]
        
        departments = []
        for dept_data in departments_data:
            dept = Department(**dept_data)
            db.add(dept)
            departments.append(dept)
        
        db.commit()
        
        # Seed Demo Users
        demo_users = [
            {
                "email": "admin@thryve.com",
                "password": "admin123",
                "full_name": "Admin User",
                "role": "admin",
                "department": "Operations",
                "status": "active"
            },
            {
                "email": "manager@thryve.com",
                "password": "manager123",
                "full_name": "Manager User",
                "role": "manager",
                "department": "Engineering",
                "status": "active"
            },
            {
                "email": "employee@thryve.com",
                "password": "employee123",
                "full_name": "Employee User",
                "role": "employee",
                "department": "Engineering",
                "status": "active"
            },
            {
                "email": "sarah.chen@thryve.com",
                "password": "demo123",
                "full_name": "Sarah Chen",
                "role": "employee",
                "department": "Engineering",
                "status": "active"
            },
            {
                "email": "mike.johnson@thryve.com",
                "password": "demo123",
                "full_name": "Mike Johnson",
                "role": "employee",
                "department": "Product",
                "status": "active"
            },
            {
                "email": "alex.kim@thryve.com",
                "password": "demo123",
                "full_name": "Alex Kim",
                "role": "manager",
                "department": "Product",
                "status": "active"
            },
            {
                "email": "emma.davis@thryve.com",
                "password": "demo123",
                "full_name": "Emma Davis",
                "role": "employee",
                "department": "Design",
                "status": "active"
            },
            {
                "email": "john.smith@thryve.com",
                "password": "demo123",
                "full_name": "John Smith",
                "role": "admin",
                "department": "Operations",
                "status": "active"
            },
        ]
        
        users_created = []
        for user_data in demo_users:
            password = user_data.pop("password")
            user = User(
                **user_data,
                password=get_password_hash(password)
            )
            db.add(user)
            users_created.append(user_data["email"])
        
        db.commit()
        
        return {
            "status": "success",
            "message": "Database seeded successfully",
            "departments_created": len(departments),
            "users_created": len(users_created),
            "demo_credentials": {
                "admin": {"email": "admin@thryve.com", "password": "admin123"},
                "manager": {"email": "manager@thryve.com", "password": "manager123"},
                "employee": {"email": "employee@thryve.com", "password": "employee123"}
            }
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Seed failed: {str(e)}")


@router.get("/seed-status")
async def seed_status(db: Session = Depends(get_db)):
    """
    Check if database has been seeded
    Public endpoint - no authentication required
    """
    user_count = db.query(User).count()
    dept_count = db.query(Department).count()
    
    return {
        "seeded": user_count > 0,
        "users": user_count,
        "departments": dept_count,
        "needs_seeding": user_count == 0
    }
