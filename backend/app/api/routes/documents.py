import os
import re
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.documents import DocumentUploadResponse
from app.services.ingestion import ingest_document

router = APIRouter()

ALLOWED_TYPES = {"application/pdf", "text/plain"}
ALLOWED_EXTENSIONS = {".pdf", ".txt"}
MAX_SIZE_MB = 10
SAFE_FILENAME_RE = re.compile(r"[^\w\s.\-]")


def _safe_filename(name: Optional[str]) -> str:
    if not name:
        return "upload"
    # Keep only safe characters, strip path traversal
    name = os.path.basename(name)
    name = SAFE_FILENAME_RE.sub("_", name)
    return name[:200] or "upload"


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    corps_id: Optional[uuid.UUID] = Form(None),
    db: AsyncSession = Depends(get_db),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only PDF and .txt files are supported")

    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only .pdf and .txt extensions are supported")

    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="File is empty")
    if len(file_bytes) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(status_code=400, detail=f"File exceeds {MAX_SIZE_MB}MB limit")

    safe_name = _safe_filename(file.filename)
    doc = await ingest_document(db, file_bytes, safe_name, corps_id)
    return doc
