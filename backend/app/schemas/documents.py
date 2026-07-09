import uuid
from datetime import datetime

from pydantic import BaseModel


class DocumentUploadResponse(BaseModel):
    id: uuid.UUID
    filename: str
    chunk_count: int
    uploaded_at: datetime

    model_config = {"from_attributes": True}
