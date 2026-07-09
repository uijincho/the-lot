from typing import List

from pydantic import BaseModel


class Source(BaseModel):
    filename: str
    text_snippet: str


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]
