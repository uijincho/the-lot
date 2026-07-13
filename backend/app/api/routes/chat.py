import uuid
from typing import Optional
from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.dependencies import get_optional_user
from app.models.user import User
from app.models.conversation import Conversation, Message
from app.schemas.chat import ChatRequest, ChatResponse, Source
from app.services.embeddings import embed
from app.services.generation import generate_answer
from app.services.vector_store import similarity_search

router = APIRouter()


async def _get_or_create_conversation(db: AsyncSession, user: User) -> Conversation:
    result = await db.execute(select(Conversation).where(Conversation.user_id == user.id))
    conversation = result.scalar_one_or_none()
    if not conversation:
        conversation = Conversation(id=uuid.uuid4(), user_id=user.id, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
        db.add(conversation)
        await db.flush()
    return conversation


@router.post("", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    query_embedding = await embed(request.question)
    chunks = await similarity_search(db, query_embedding, top_k=5)

    context_texts = [chunk.text for chunk in chunks]
    answer = await generate_answer(request.question, context_texts, request.user_context)

    sources = [
        Source(
            filename=chunk.document.filename if chunk.document else "unknown",
            text_snippet=chunk.text[:200],
        )
        for chunk in chunks
        if chunk.document
    ]

    if current_user:
        conversation = await _get_or_create_conversation(db, current_user)
        sources_data = [{"filename": s.filename, "text_snippet": s.text_snippet} for s in sources]
        db.add(Message(
            id=uuid.uuid4(),
            conversation_id=conversation.id,
            role="user",
            content=request.question,
            sources=None,
        ))
        db.add(Message(
            id=uuid.uuid4(),
            conversation_id=conversation.id,
            role="assistant",
            content=answer,
            sources=sources_data if sources_data else None,
        ))
        conversation.updated_at = datetime.utcnow()
        await db.commit()

    return ChatResponse(answer=answer, sources=sources)
