"""
UoM (Unit of Measurement) Calculator
Implements calculation formulas based on UoM type as per hackathon requirements.
"""
from datetime import date, datetime
from typing import Optional


def calculate_achievement_percentage(
    uom_type: str,
    target_value: float,
    achieved_value: float,
    uom_direction: Optional[str] = "Higher is Better",
    target_date: Optional[date] = None,
    completion_date: Optional[date] = None
) -> float:
    """
    Calculate achievement percentage based on UoM type.
    
    Args:
        uom_type: One of "Numeric", "Percentage", "Timeline", "Zero-based"
        target_value: Target value for the goal
        achieved_value: Actual achieved value
        uom_direction: For Numeric/Percentage - "Higher is Better" or "Lower is Better"
        target_date: For Timeline - target completion date
        completion_date: For Timeline - actual completion date
    
    Returns:
        Achievement percentage (0-100+)
    """
    
    if uom_type == "Zero-based":
        # Zero = Success: If 0 → 100%, else 0%
        return 100.0 if achieved_value == 0 else 0.0
    
    elif uom_type == "Timeline":
        # Date-based completion
        if not target_date:
            return 0.0
        
        if not completion_date:
            # Not yet completed - calculate based on current date
            current = date.today()
            if current <= target_date:
                # Still on track
                return 50.0  # In progress
            else:
                # Overdue
                days_overdue = (current - target_date).days
                # Reduce percentage based on delay
                return max(0.0, 100.0 - (days_overdue * 2))
        
        # Completed - check if on time
        if completion_date <= target_date:
            return 100.0
        else:
            # Completed late - reduce based on delay
            days_late = (completion_date - target_date).days
            return max(0.0, 100.0 - (days_late * 2))
    
    elif uom_type in ["Numeric", "Percentage"]:
        # Avoid division by zero
        if target_value == 0:
            return 0.0
        
        if uom_direction == "Higher is Better":
            # Min formula: Achievement ÷ Target
            percentage = (achieved_value / target_value) * 100
        else:  # "Lower is Better"
            # Max formula: Target ÷ Achievement
            if achieved_value == 0:
                return 0.0
            percentage = (target_value / achieved_value) * 100
        
        return round(percentage, 2)
    
    else:
        # Default fallback
        return 0.0


def get_valid_uom_types():
    """Return list of valid UoM types."""
    return ["Numeric", "Percentage", "Timeline", "Zero-based"]


def get_valid_uom_directions():
    """Return list of valid UoM directions for Numeric/Percentage."""
    return ["Higher is Better", "Lower is Better"]


def validate_uom_type(uom_type: str) -> bool:
    """Validate if UoM type is valid."""
    return uom_type in get_valid_uom_types()


def validate_uom_direction(uom_direction: str) -> bool:
    """Validate if UoM direction is valid."""
    return uom_direction in get_valid_uom_directions()
