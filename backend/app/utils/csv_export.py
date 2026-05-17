"""
CSV Export Utility - Export system data to CSV format
Enables reporting and data analysis outside the platform
"""
import csv
import io
from typing import List, Dict, Any
from datetime import datetime


def export_goals_to_csv(goals: List[Dict[str, Any]]) -> str:
    """
    Export goals data to CSV format.
    
    Args:
        goals: List of goal dictionaries
    
    Returns:
        CSV string
    """
    output = io.StringIO()
    
    if not goals:
        return ""
    
    # Define CSV columns
    fieldnames = [
        "Goal ID",
        "Title",
        "Description",
        "Strategic Area",
        "Employee Name",
        "Employee Email",
        "Department",
        "Quarter",
        "Target Value",
        "Achieved Value",
        "Progress %",
        "Weightage",
        "UOM Type",
        "Status",
        "Approval Status",
        "Is Locked",
        "Manager Comment",
    ]
    
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    
    for goal in goals:
        # Calculate progress percentage
        progress = 0
        if goal.get("target_value", 0) > 0:
            progress = round((goal.get("achieved_value", 0) / goal["target_value"]) * 100, 2)
        
        writer.writerow({
            "Goal ID": goal.get("id", ""),
            "Title": goal.get("title", ""),
            "Description": goal.get("description", ""),
            "Strategic Area": goal.get("strategic_area", ""),
            "Employee Name": goal.get("employee_name", ""),
            "Employee Email": goal.get("employee_email", ""),
            "Department": goal.get("department", ""),
            "Quarter": goal.get("quarter", ""),
            "Target Value": goal.get("target_value", 0),
            "Achieved Value": goal.get("achieved_value", 0),
            "Progress %": progress,
            "Weightage": goal.get("weightage", 0),
            "UOM Type": goal.get("uom_type", ""),
            "Status": goal.get("status", ""),
            "Approval Status": goal.get("approval_status", ""),
            "Is Locked": "Yes" if goal.get("is_locked", False) else "No",
            "Manager Comment": goal.get("manager_comment", ""),
        })
    
    return output.getvalue()


def export_analytics_to_csv(analytics_data: Dict[str, Any], report_type: str) -> str:
    """
    Export analytics data to CSV format.
    
    Args:
        analytics_data: Analytics dictionary
        report_type: Type of report ("overview", "team", "departments", "trends")
    
    Returns:
        CSV string
    """
    output = io.StringIO()
    
    if report_type == "overview":
        fieldnames = ["Metric", "Value"]
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        
        for key, value in analytics_data.items():
            writer.writerow({
                "Metric": key.replace("_", " ").title(),
                "Value": value
            })
    
    elif report_type == "team":
        if not analytics_data:
            return ""
        
        fieldnames = [
            "Employee Name",
            "Employee Email",
            "Department",
            "Total Goals",
            "Completed Goals",
            "Avg Progress %",
            "Completion Rate %",
        ]
        
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        
        for employee in analytics_data:
            writer.writerow({
                "Employee Name": employee.get("employee_name", ""),
                "Employee Email": employee.get("employee_email", ""),
                "Department": employee.get("department", ""),
                "Total Goals": employee.get("total_goals", 0),
                "Completed Goals": employee.get("completed_goals", 0),
                "Avg Progress %": employee.get("avg_progress", 0),
                "Completion Rate %": employee.get("completion_rate", 0),
            })
    
    elif report_type == "departments":
        if not analytics_data:
            return ""
        
        fieldnames = [
            "Department",
            "Total Goals",
            "Completed Goals",
            "Avg Progress %",
            "Completion Rate %",
            "Employee Count",
        ]
        
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        
        for dept in analytics_data:
            writer.writerow({
                "Department": dept.get("department", ""),
                "Total Goals": dept.get("total_goals", 0),
                "Completed Goals": dept.get("completed_goals", 0),
                "Avg Progress %": dept.get("avg_progress", 0),
                "Completion Rate %": dept.get("completion_rate", 0),
                "Employee Count": dept.get("employee_count", 0),
            })
    
    elif report_type == "trends":
        quarters = analytics_data.get("quarters", [])
        total_goals = analytics_data.get("total_goals", [])
        completed_goals = analytics_data.get("completed_goals", [])
        completion_rates = analytics_data.get("completion_rates", [])
        avg_progress = analytics_data.get("avg_progress", [])
        
        fieldnames = [
            "Quarter",
            "Total Goals",
            "Completed Goals",
            "Completion Rate %",
            "Avg Progress %",
        ]
        
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        
        for i, quarter in enumerate(quarters):
            writer.writerow({
                "Quarter": quarter,
                "Total Goals": total_goals[i] if i < len(total_goals) else 0,
                "Completed Goals": completed_goals[i] if i < len(completed_goals) else 0,
                "Completion Rate %": completion_rates[i] if i < len(completion_rates) else 0,
                "Avg Progress %": avg_progress[i] if i < len(avg_progress) else 0,
            })
    
    return output.getvalue()


def export_audit_logs_to_csv(logs: List[Dict[str, Any]]) -> str:
    """
    Export audit logs to CSV format.
    
    Args:
        logs: List of audit log dictionaries
    
    Returns:
        CSV string
    """
    output = io.StringIO()
    
    if not logs:
        return ""
    
    fieldnames = [
        "Log ID",
        "User Email",
        "Action",
        "Target",
        "Target ID",
        "Timestamp",
        "Details",
    ]
    
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    
    for log in logs:
        writer.writerow({
            "Log ID": log.get("id", ""),
            "User Email": log.get("user_email", ""),
            "Action": log.get("action", ""),
            "Target": log.get("target", ""),
            "Target ID": log.get("target_id", ""),
            "Timestamp": log.get("timestamp", ""),
            "Details": log.get("details", ""),
        })
    
    return output.getvalue()


def export_users_to_csv(users: List[Dict[str, Any]]) -> str:
    """
    Export users data to CSV format.
    
    Args:
        users: List of user dictionaries
    
    Returns:
        CSV string
    """
    output = io.StringIO()
    
    if not users:
        return ""
    
    fieldnames = [
        "User ID",
        "Full Name",
        "Email",
        "Role",
        "Department",
        "Status",
    ]
    
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    
    for user in users:
        writer.writerow({
            "User ID": user.get("id", ""),
            "Full Name": user.get("full_name", ""),
            "Email": user.get("email", ""),
            "Role": user.get("role", ""),
            "Department": user.get("department", ""),
            "Status": user.get("status", ""),
        })
    
    return output.getvalue()
