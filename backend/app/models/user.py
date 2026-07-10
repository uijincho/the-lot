import uuid
from datetime import datetime
from typing import Optional, List, Any

from sqlalchemy import String, Text, Integer, DateTime, ARRAY
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(Text, nullable=False)
    name: Mapped[Optional[str]] = mapped_column(String(255))
    instruments: Mapped[Optional[List[str]]] = mapped_column(ARRAY(String))
    age: Mapped[Optional[int]] = mapped_column(Integer)
    experience: Mapped[Optional[str]] = mapped_column(String(20))
    corps_history: Mapped[Optional[Any]] = mapped_column(JSONB)
    states: Mapped[Optional[List[str]]] = mapped_column(ARRAY(String))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
