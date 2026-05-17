def calculate_progress(uom_type: str, target: float, achieved: float) -> float:
    """
    Dynamic progress calculation engine.

    Supported UoM types:
      Min      → achieved ÷ target × 100  (higher is better)
      Max      → target ÷ achieved × 100  (lower is better)
      Zero     → 100% if achieved == 0, else 0%
      Timeline → percentage completion capped at 100%
    """
    if uom_type == "Min":
        if target == 0:
            return 0.0
        return round(min((achieved / target) * 100, 100), 2)

    elif uom_type == "Max":
        if achieved == 0:
            return 0.0
        return round(min((target / achieved) * 100, 100), 2)

    elif uom_type == "Zero":
        return 100.0 if achieved == 0 else 0.0

    elif uom_type == "Timeline":
        if target == 0:
            return 0.0
        return round(min((achieved / target) * 100, 100), 2)

    # Fallback
    return 0.0
