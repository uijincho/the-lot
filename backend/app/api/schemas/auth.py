import uuid
from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    instruments: Optional[List[str]] = None
    age: Optional[int] = None
    experience: Optional[str] = None
    corps_history: Optional[Any] = None
    states: Optional[List[str]] = None


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    name: Optional[str] = None
    instruments: Optional[List[str]] = None
    age: Optional[int] = None
    experience: Optional[str] = None
    corps_history: Optional[Any] = None
    states: Optional[List[str]] = None

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
