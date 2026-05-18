from __future__ import annotations

from datetime import date, datetime
from typing import Any, Dict, List, Optional
import calendar

from sqlalchemy.orm import Session

from app.models.goal import Goal
from app.models.checkin import Checkin
from app.models.user import User
from app.utils.uom_calculator import calculate_achievement_percentage
from app.utils.quarterly_windows import _get_window_config, _window_dates
from app.services import analytics_service


def _goal_progress(goal: Goal) -> float:
    return float(
        calculate_achievement_percentage(
            uom_type=goal.uom_type,
            target_value=goal.target_value,
            achieved_value=goal.achieved_value,
            uom_direction=goal.uom_direction,
            target_date=goal.target_date,
            completion_date=goal.completion_date,
        )
        or 0
    )


def _parse_manager_comment(value: str) -> tuple[str, Optional[str], str]:
    text = (value or "").strip()
    if not text:
        return "Manager", None, ""

    if text.startswith("[") and "]" in text:
        prefix, rest = text.split("]", 1)
        prefix = prefix[1:]
        parts = [p.strip() for p in prefix.split("|") if p.strip()]
        author = parts[0] if parts else "Manager"
        timestamp = parts[1] if len(parts) > 1 else None
        message = rest.strip() or text
        return author, timestamp, message

    return "Manager", None, text


def get_employee_achievements(db: Session, user_id: int) -> Dict[str, Any]:
    goals = db.query(Goal).filter(Goal.employee_id == user_id).all()
    total_goals = len(goals)
    completed_goals = [g for g in goals if (g.status or "").lower() == "completed"]

    progress_values = [_goal_progress(g) for g in goals]
    avg_progress = round(sum(progress_values) / len(progress_values), 2) if progress_values else 0
    completion_rate = round((len(completed_goals) / total_goals * 100) if total_goals else 0, 2)

    rankings = analytics_service.get_employee_ranking(db, limit=1000)
    rank_entry = next((item for item in rankings if item.get("employee_id") == user_id), None)
    rank_position = rank_entry.get("rank") if rank_entry else None

    recognitions = []
    if goals:
        goal_ids = [g.id for g in goals]
        checkins = (
            db.query(Checkin)
            .filter(Checkin.goal_id.in_(goal_ids), Checkin.manager_comment != "")
            .order_by(Checkin.updated_at.desc())
            .limit(5)
            .all()
        )
        for checkin in checkins:
            author, comment_time, message = _parse_manager_comment(checkin.manager_comment)
            tag = "Impactful" if (checkin.status or "").lower() == "completed" else "Collaborative"
            recognitions.append(
                {
                    "id": f"rec-{checkin.id}",
                    "author": author,
                    "role": "MANAGER",
                    "tag": tag,
                    "message": message,
                    "time": comment_time or (checkin.updated_at.isoformat() if checkin.updated_at else ""),
                    "likes": 0,
                }
            )

    milestones = []
    def _milestone_key(goal: Goal) -> datetime:
        return goal.completion_date or goal.updated_at or goal.created_at or datetime.min

    for goal in sorted(completed_goals, key=_milestone_key, reverse=True)[:3]:
        milestone_date = _milestone_key(goal)
        milestones.append(
            {
                "id": f"milestone-{goal.id}",
                "date": milestone_date.isoformat() if milestone_date else "",
                "title": goal.title,
                "desc": goal.description or "Completed goal",
            }
        )

    return {
        "total_goals": total_goals,
        "completed_goals": len(completed_goals),
        "avg_progress": avg_progress,
        "completion_rate": completion_rate,
        "overachievement_rate": avg_progress,
        "rank": {
            "position": rank_position,
            "total": len(rankings),
        },
        "recognitions": recognitions,
        "milestones": milestones,
    }


def get_employee_development(db: Session, user_id: int) -> Dict[str, Any]:
    goals = db.query(Goal).filter(Goal.employee_id == user_id).all()
    total_goals = len(goals)
    completed = [g for g in goals if (g.status or "").lower() == "completed"]
    completion_rate = round((len(completed) / total_goals * 100) if total_goals else 0, 2)

    area_map: Dict[str, List[float]] = {}
    for goal in goals:
        label = (goal.strategic_area or "").strip() or f"{goal.uom_type} Focus"
        area_map.setdefault(label, []).append(_goal_progress(goal))

    skills = []
    for name, values in area_map.items():
        avg = round(sum(values) / len(values), 2) if values else 0
        skills.append({"name": name, "value": avg})

    skills.sort(key=lambda item: item["value"], reverse=True)
    skills = skills[:3]
    while len(skills) < 3:
        skills.append({"name": f"Growth Focus {len(skills)+1}", "value": 0})

    objectives = []
    active_goals = [g for g in goals if (g.status or "").lower() != "completed"]
    for goal in sorted(active_goals, key=_goal_progress, reverse=True)[:3]:
        objectives.append(
            {
                "id": goal.id,
                "title": goal.title,
                "progress": round(_goal_progress(goal), 2),
                "status": goal.status or "Not Started",
            }
        )

    user = db.query(User).filter(User.id == user_id).first()
    current_role = user.role.title() if user and user.role else "Employee"

    if completion_rate >= 80:
        next_milestone = "Top Performer"
    elif completion_rate >= 50:
        next_milestone = "Growth Track"
    else:
        next_milestone = "Foundation Builder"

    remaining_for_target = max(0, int(round((0.8 * total_goals) - len(completed)))) if total_goals else 0
    insight = (
        f"You are {remaining_for_target} goals away from reaching an 80% completion rate."
        if total_goals
        else "Set your first goal to unlock development insights."
    )

    recommendations = []
    for goal in sorted(active_goals, key=_goal_progress)[:3]:
        recommendations.append(
            {
                "id": f"rec-goal-{goal.id}",
                "type": "goal_focus",
                "title": goal.title,
                "detail": f"Current progress: {round(_goal_progress(goal), 2)}%",
            }
        )

    return {
        "skills": skills,
        "objectives": objectives,
        "career": {
            "current_role": current_role,
            "next_milestone": next_milestone,
            "insight": insight,
        },
        "recommendations": recommendations,
    }


def _month_bounds(year: int, month: int) -> tuple[date, date]:
    start_date = date(year, month, 1)
    last_day = calendar.monthrange(year, month)[1]
    end_date = date(year, month, last_day)
    return start_date, end_date


def get_employee_calendar(db: Session, user_id: int, year: int, month: int) -> Dict[str, Any]:
    start_date, end_date = _month_bounds(year, month)

    goals = db.query(Goal).filter(Goal.employee_id == user_id).all()
    goal_ids = [g.id for g in goals]

    events: List[Dict[str, Any]] = []

    for goal in goals:
        if goal.target_date and start_date <= goal.target_date <= end_date:
            events.append(
                {
                    "id": f"goal-due-{goal.id}",
                    "date": goal.target_date.isoformat(),
                    "title": f"Goal due: {goal.title}",
                    "type": "goal_due",
                    "meta": {
                        "goal_id": goal.id,
                        "goal_status": goal.status,
                    },
                }
            )
        if goal.completion_date and start_date <= goal.completion_date <= end_date:
            events.append(
                {
                    "id": f"goal-complete-{goal.id}",
                    "date": goal.completion_date.isoformat(),
                    "title": f"Goal completed: {goal.title}",
                    "type": "goal_completed",
                    "meta": {
                        "goal_id": goal.id,
                        "goal_status": goal.status,
                    },
                }
            )

    if goal_ids:
        checkins = (
            db.query(Checkin)
            .filter(Checkin.goal_id.in_(goal_ids))
            .all()
        )
        for checkin in checkins:
            if not checkin.created_at:
                continue
            checkin_date = checkin.created_at.date()
            if start_date <= checkin_date <= end_date:
                events.append(
                    {
                        "id": f"checkin-{checkin.id}",
                        "date": checkin_date.isoformat(),
                        "title": f"Check-in submitted ({checkin.quarter})",
                        "type": "checkin_submitted",
                        "meta": {
                            "goal_id": checkin.goal_id,
                            "quarter": checkin.quarter,
                            "status": checkin.status,
                        },
                    }
                )

    window_config = _get_window_config(db)
    for window_name in window_config.keys():
        window_start, window_end = _window_dates(window_name, year, db)
        if start_date <= window_start <= end_date:
            events.append(
                {
                    "id": f"window-start-{window_name}",
                    "date": window_start.isoformat(),
                    "title": f"{window_name} opens",
                    "type": "checkin_window",
                    "meta": {"window": window_name},
                }
            )
        if start_date <= window_end <= end_date:
            events.append(
                {
                    "id": f"window-end-{window_name}",
                    "date": window_end.isoformat(),
                    "title": f"{window_name} deadline",
                    "type": "checkin_deadline",
                    "meta": {"window": window_name},
                }
            )

    events.sort(key=lambda item: item["date"])

    return {
        "year": year,
        "month": month,
        "events": events,
    }
