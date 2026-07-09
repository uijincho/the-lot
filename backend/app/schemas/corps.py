import uuid
from datetime import date, datetime
from typing import Optional, List

from pydantic import BaseModel


class CorpsResponse(BaseModel):
    id: uuid.UUID
    name: str
    location: Optional[str]
    audition_date: Optional[date]
    audition_location: Optional[str]
    website_url: Optional[str]
    instruments: Optional[List[str]]
    requirements: Optional[str]
    corps_class: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class CorpsList(BaseModel):
    corps: List[CorpsResponse]
    total: int
