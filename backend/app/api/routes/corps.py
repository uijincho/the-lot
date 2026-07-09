import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.corps import Corps
from app.schemas.corps import CorpsResponse, CorpsList

router = APIRouter()


@router.get("", response_model=CorpsList)
async def list_corps(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Corps).order_by(Corps.name))
    corps = result.scalars().all()
    return CorpsList(corps=corps, total=len(corps))


@router.get("/{corps_id}", response_model=CorpsResponse)
async def get_corps(corps_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Corps).where(Corps.id == corps_id))
    corps = result.scalar_one_or_none()
    if not corps:
        raise HTTPException(status_code=404, detail="Corps not found")
    return corps
