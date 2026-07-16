import uuid
from datetime import date, datetime
from typing import Optional, List, Dict

from pydantic import BaseModel


class CorpsResponse(BaseModel):
    id: uuid.UUID
    name: str
    location: Optional[str]
    audition_date: Optional[date]
    audition_location: Optional[str]
    # Per-caption locations overlay. Keys: "Brass" | "Drumline" | "Front Ensemble" | "Color Guard" | "All"
    audition_locations: Optional[Dict[str, List[str]]]
    website_url: Optional[str]
    instruments: Optional[List[str]]
    requirements: Optional[str]
    corps_class: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class CorpsList(BaseModel):
    corps: List[CorpsResponse]
    total: int
