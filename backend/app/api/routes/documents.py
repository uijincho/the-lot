import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.documents import DocumentUploadResponse
from app.services.ingestion import ingest_document

router = APIRouter()

ALLOWED_TYPES = {"application/pdf", "text/plain"}
MAX_SIZE_MB = 10


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    corps_id: Optional[uuid.UUID] = Form(None),
    db: AsyncSession = Depends(get_db),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only PDF and .txt files are supported")

    file_bytes = await file.read()
    if len(file_bytes) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"File exceeds {MAX_SIZE_MB}MB limit")

    doc = await ingest_document(db, file_bytes, file.filename, corps_id)
    return doc
