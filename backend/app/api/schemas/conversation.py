from datetime import datetime
from typing import Optional, Any, List
from pydantic import BaseModel


class MessageOut(BaseModel):
    role: str
    content: str
    sources: Optional[Any] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class ConversationOut(BaseModel):
    messages: List[MessageOut]
