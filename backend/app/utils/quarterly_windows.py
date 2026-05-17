from datetime import date, datetime
from typing import Dict, Optional

from sqlalchemy.orm import Session

from app.models.quarterly_window import QuarterlyWindow


WINDOW_CONFIG: Dict[str, Dict[str, tuple[int, int]]] = {
    "Phase 1 - Goal Setting": {"start": (5, 1), "end": (5, 31)},
    "Q1 Check-in": {"start": (7, 1), "end": (7, 31)},
    "Q2 Check-in": {"start": (10, 1), "end": (10, 31)},
    "Q3 Check-in": {"start": (1, 1), "end": (1, 31)},
    "Q4 Check-in": {"start": (3, 1), "end": (4, 30)},
}

CHECKIN_WINDOW_BY_QUARTER = {
    "Q1": "Q1 Check-in",
    "Q2": "Q2 Check-in",
    "Q3": "Q3 Check-in",
    "Q4": "Q4 Check-in",
}


def _get_window_config(db: Optional[Session] = None) -> Dict[str, Dict[str, tuple[int, int]]]:
    if db is None:
        return WINDOW_CONFIG

    rows = db.query(QuarterlyWindow).all()
    if not rows:
        return WINDOW_CONFIG

    return {
        row.window_name: {
            "start": (row.start_month, row.start_day),
            "end": (row.end_month, row.end_day),
        }
        for row in rows
    }


def _window_dates(window_name: str, year: int, db: Optional[Session] = None) -> tuple[date, date]:
    cfg = _get_window_config(db)[window_name]
    sm, sd = cfg["start"]
    em, ed = cfg["end"]
    return date(year, sm, sd), date(year, em, ed)


def _format_window(window_name: str, year: int, db: Optional[Session] = None) -> str:
    start_date, end_date = _window_dates(window_name, year, db)
    return f"{start_date.strftime('%b %d, %Y')} to {end_date.strftime('%b %d, %Y')}"


def is_window_active(window_name: str, on_date: Optional[date] = None, db: Optional[Session] = None) -> bool:
    current = on_date or datetime.now().date()
    start_date, end_date = _window_dates(window_name, current.year, db)
    return start_date <= current <= end_date


def enforce_window(window_name: str, db: Optional[Session] = None, on_date: Optional[date] = None) -> None:
    current = on_date or datetime.now().date()
    if is_window_active(window_name, current, db):
        return
    range_str = _format_window(window_name, current.year, db)
    raise ValueError(
        f"This action is only allowed during {window_name} from {range_str}"
    )


def validate_no_window_overlap(config: Dict[str, Dict[str, tuple[int, int]]]) -> None:
    ranges = []
    year = 2026
    for window_name, cfg in config.items():
        sm, sd = cfg["start"]
        em, ed = cfg["end"]
        start = date(year, sm, sd)
        end = date(year, em, ed)
        if end < start:
            raise ValueError(f"{window_name} has an end date before start date")
        ranges.append((window_name, start, end))

    ranges.sort(key=lambda x: x[1])
    for i in range(len(ranges) - 1):
        curr_name, curr_start, curr_end = ranges[i]
        next_name, next_start, _ = ranges[i + 1]
        if next_start <= curr_end:
            raise ValueError(f"Window overlap detected between {curr_name} and {next_name}")
