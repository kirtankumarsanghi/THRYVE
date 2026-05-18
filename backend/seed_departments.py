"""
Seed initial departments for testing
"""
from app.core.database import SessionLocal
from app.models.department import Department

def seed_departments():
    """Create initial departments"""
    db = SessionLocal()
    
    try:
        # Check if departments already exist
        existing_count = db.query(Department).count()
        if existing_count > 0:
            print(f"✓ Departments already exist ({existing_count} found). Skipping seed.")
            return
        
        departments = [
            {
                "name": "Engineering",
                "code": "ENG",
                "description": "Software development and technical infrastructure",
                "manager_name": "Sarah Chen",
                "manager_email": "sarah.chen@thryve.com",
                "budget": "$2.5M",
                "location": "San Francisco",
                "status": "active"
            },
            {
                "name": "Product Management",
                "code": "PM",
                "description": "Product strategy and roadmap planning",
                "manager_name": "Michael Torres",
                "manager_email": "michael.torres@thryve.com",
                "budget": "$800K",
                "location": "San Francisco",
                "status": "active"
            },
            {
                "name": "Sales",
                "code": "SALES",
                "description": "Revenue generation and customer acquisition",
                "manager_name": "Jennifer Williams",
                "manager_email": "jennifer.williams@thryve.com",
                "budget": "$1.8M",
                "location": "New York",
                "status": "active"
            },
            {
                "name": "Marketing",
                "code": "MKT",
                "description": "Brand awareness and demand generation",
                "manager_name": "David Kim",
                "manager_email": "david.kim@thryve.com",
                "budget": "$1.2M",
                "location": "Austin",
                "status": "active"
            },
            {
                "name": "Human Resources",
                "code": "HR",
                "description": "Talent acquisition and employee experience",
                "manager_name": "Lisa Anderson",
                "manager_email": "lisa.anderson@thryve.com",
                "budget": "$600K",
                "location": "San Francisco",
                "status": "active"
            },
            {
                "name": "Finance",
                "code": "FIN",
                "description": "Financial planning and accounting",
                "manager_name": "Robert Martinez",
                "manager_email": "robert.martinez@thryve.com",
                "budget": "$500K",
                "location": "New York",
                "status": "active"
            },
            {
                "name": "Customer Success",
                "code": "CS",
                "description": "Customer support and relationship management",
                "manager_name": "Emily Johnson",
                "manager_email": "emily.johnson@thryve.com",
                "budget": "$900K",
                "location": "Remote",
                "status": "active"
            },
            {
                "name": "Executive",
                "code": "EXEC",
                "description": "Executive leadership and strategic direction",
                "manager_name": "Marcus Rivera",
                "manager_email": "marcus.rivera@thryve.com",
                "budget": "$3.5M",
                "location": "San Francisco",
                "status": "active"
            }
        ]
        
        for dept_data in departments:
            dept = Department(**dept_data)
            db.add(dept)
        
        db.commit()
        print(f"✓ Successfully seeded {len(departments)} departments")
        
        # Display created departments
        print("\nCreated Departments:")
        print("-" * 60)
        for dept in db.query(Department).all():
            print(f"  {dept.code:8} | {dept.name:25} | {dept.manager_name}")
        
    except Exception as e:
        print(f"✗ Error seeding departments: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    print("Seeding departments...")
    seed_departments()
