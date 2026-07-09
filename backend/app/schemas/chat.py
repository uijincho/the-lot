import re
from typing import List, Optional

from pydantic import BaseModel, field_validator


class Source(BaseModel):
    filename: str
    text_snippet: str


class CorpsHistoryEntry(BaseModel):
    corps: str
    year: str


class UserContext(BaseModel):
    name: Optional[str] = None
    instruments: Optional[List[str]] = None
    age: Optional[str] = None
    experience: Optional[str] = None
    corpsHistory: Optional[List[CorpsHistoryEntry]] = None
    states: Optional[List[str]] = None


class ChatRequest(BaseModel):
    question: str
    user_context: Optional[UserContext] = None

    @field_validator("question")
    @classmethod
    def validate_question(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("question must not be empty")
        if len(v) > 1000:
            raise ValueError("question must not exceed 1000 characters")
        v = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", v)
        if not v:
            raise ValueError("question contains no valid characters")
        return v


class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]
