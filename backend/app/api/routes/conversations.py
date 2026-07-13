from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.models.conversation import Conversation, Message
from app.api.schemas.conversation import MessageOut

router = APIRouter()


@router.get("/current", response_model=list[MessageOut])
async def get_current_conversation(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Conversation).where(Conversation.user_id == current_user.id)
    )
    conversation = result.scalar_one_or_none()
    if not conversation:
        return []

    msgs = await db.execute(
        select(Message)
        .where(Message.conversation_id == conversation.id)
        .order_by(Message.created_at)
    )
    return [MessageOut.model_validate(m) for m in msgs.scalars().all()]


@router.delete("/current", status_code=status.HTTP_204_NO_CONTENT)
async def delete_current_conversation(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Conversation).where(Conversation.user_id == current_user.id)
    )
    conversation = result.scalar_one_or_none()
    if conversation:
        await db.execute(delete(Message).where(Message.conversation_id == conversation.id))
        await db.execute(delete(Conversation).where(Conversation.id == conversation.id))
        await db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
