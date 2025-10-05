from datetime import datetime
from typing import Any
import pandas as pd

def _parse_game_date(value: Any) -> datetime:
    
    if isinstance(value, datetime):
        return value
    ts = getattr(value, "to_pydatetime", None)
    if callable(ts):
        return ts()
    s = str(value)
    
    for fmt in ("%m/%d/%Y %H:%M:%S", "%b %d, %Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(s, fmt)
        except ValueError:
            continue
   
    raise ValueError(f"Unsupported date format: {value}")

def _safe_int(value: Any) -> int:
    if value is None:
        return 0
    if isinstance(value, float) and pd.isna(value):
        return 0
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


def _safe_float(value: Any) -> float:
    if value is None:
        return 0.0
    if isinstance(value, float) and pd.isna(value):
        return 0.0
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0