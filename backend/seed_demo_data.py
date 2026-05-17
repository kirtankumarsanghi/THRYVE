"""
Seed Demo Data - Create demo users and sample goals for testing
Run this script to populate the database with demo data
"""
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.goal import Goal
from app.models.checkin import Checkin
from app.core.security import hash_password
import random

# Create tables
Base.metadata.create_all(bind=engine)

def seed_users(db: Session):
    """Create demo users"""
    print("🌱 Seeding users...")
    
    users_data = [
        # Employees
        {
            "full_name": "Alex Johnson",
            "email": "employee@thryve.com",
            "password": "employee123",
            "role": "employee",
            "department": "Engineering",
            "status": "active"
        },
        {
            "full_name": "Emma Davis",
            "email": "emma@thryve.com",
            "password": "password123",
            "role": "employee",
            "department": "Engineering",
            "status": "active"
        },
        {
            "full_name": "Michael Chen",
            "email": "michael@thryve.com",
            "password": "password123",
            "role": "employee",
            "department": "Sales",
            "status": "active"
        },
        {
            "full_name": "Sofia Rodriguez",
            "email": "sofia@thryve.com",
            "password": "password123",
            "role": "employee",
            "department": "Marketing",
            "status": "active"
        },
        {
            "full_name": "James Wilson",
            "email": "james@thryve.com",
            "password": "password123",
            "role": "employee",
            "department": "HR",
            "status": "active"
        },
        # Managers
        {
            "full_name": "Sarah Chen",
            "email": "manager@thryve.com",
            "password": "manager123",
            "role": "manager",
            "department": "Engineering",
            "status": "active"
        },
        {
            "full_name": "David Park",
            "email": "david@thryve.com",
            "password": "password123",
            "role": "manager",
            "department": "Sales",
            "status": "active"
        },
        # Admin
        {
            "full_name": "Marcus Rivera",
            "email": "admin@thryve.com",
            "password": "admin123",
            "role": "admin",
            "department": "Executive",
            "status": "active"
        },
    ]
    
    created_users = []
    for user_data in users_data:
        # Check if user already exists
        existing = db.query(User).filter(User.email == user_data["email"]).first()
        if existing:
            print(f"  ⚠️  User {user_data['email']} already exists, skipping...")
            created_users.append(existing)
            continue
        
        user = User(
            full_name=user_data["full_name"],
            email=user_data["email"],
            password=hash_password(user_data["password"]),
            role=user_data["role"],
            department=user_data["department"],
            status=user_data["status"]
        )
        db.add(user)
        created_users.append(user)
        print(f"  ✅ Created {user_data['role']}: {user_data['email']}")
    
    db.commit()
    print(f"✅ Seeded {len(created_users)} users\n")
    return created_users


def seed_goals(db: Session, users):
    """Create sample goals for employees"""
    print("🎯 Seeding goals...")
    
    employees = [u for u in users if u.role == "employee"]
    
    strategic_areas = [
        "Revenue Growth",
        "Customer Satisfaction",
        "Product Innovation",
        "Operational Excellence",
        "Team Development"
    ]
    
    quarters = ["Q1", "Q2", "Q3", "Q4"]
    
    goals_created = 0
    
    for employee in employees:
        # Create 3-5 goals per employee
        num_goals = random.randint(3, 5)
        
        for i in range(num_goals):
            quarter = random.choice(quarters)
            strategic_area = random.choice(strategic_areas)
            target_value = random.randint(50, 200)
            achieved_value = random.randint(0, target_value)
            weightage = random.choice([10, 15, 20, 25, 30])
            
            # Determine status based on achieved value
            if achieved_value >= target_value:
                status = "completed"
                approval_status = "approved"
                is_locked = True
            elif achieved_value > 0:
                status = "in_progress"
                approval_status = random.choice(["approved", "pending"])
                is_locked = approval_status == "approved"
            else:
                status = "pending"
                approval_status = "pending"
                is_locked = False
            
            goal = Goal(
                title=f"{strategic_area} - {employee.full_name.split()[0]}'s Goal {i+1}",
                description=f"Achieve {target_value} units in {quarter} for {strategic_area}",
                strategic_area=strategic_area,
                target_value=target_value,
                achieved_value=achieved_value,
                weightage=weightage,
                uom_type="Min",
                quarter=quarter,
                status=status,
                approval_status=approval_status,
                is_locked=is_locked,
                manager_comment="Looks good!" if approval_status == "approved" else "",
                employee_id=employee.id
            )
            db.add(goal)
            goals_created += 1
    
    db.commit()
    print(f"✅ Seeded {goals_created} goals\n")


def seed_checkins(db: Session):
    """Create sample check-ins for some goals"""
    print("📊 Seeding check-ins...")
    
    # Get approved goals
    goals = db.query(Goal).filter(Goal.approval_status == "approved").all()
    
    checkins_created = 0
    
    for goal in goals[:10]:  # Add check-ins to first 10 approved goals
        # Create 1-2 check-ins per goal
        num_checkins = random.randint(1, 2)
        
        for i in range(num_checkins):
            planned_value = goal.target_value / 4  # Quarterly target
            achieved_value = random.randint(0, int(planned_value * 1.2))
            progress = (achieved_value / goal.target_value) * 100 if goal.target_value > 0 else 0
            
            checkin = Checkin(
                quarter=goal.quarter,
                planned_value=planned_value,
                achieved_value=achieved_value,
                progress_percentage=min(progress, 100),
                status="submitted",
                comment=f"Progress update {i+1}",
                goal_id=goal.id
            )
            db.add(checkin)
            checkins_created += 1
    
    db.commit()
    print(f"✅ Seeded {checkins_created} check-ins\n")


def main():
    """Main seeding function"""
    print("\n" + "="*60)
    print("🌱 THRYVE DEMO DATA SEEDER")
    print("="*60 + "\n")
    
    db = SessionLocal()
    
    try:
        # Seed users
        users = seed_users(db)
        
        # Seed goals
        seed_goals(db, users)
        
        # Seed check-ins
        seed_checkins(db)
        
        print("="*60)
        print("✅ DEMO DATA SEEDED SUCCESSFULLY!")
        print("="*60)
        print("\n📝 Demo Credentials:")
        print("  Employee: employee@thryve.com / employee123")
        print("  Manager:  manager@thryve.com / manager123")
        print("  Admin:    admin@thryve.com / admin123")
        print("\n🚀 Start the backend server and login with these credentials!\n")
        
    except Exception as e:
        print(f"\n❌ Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()
