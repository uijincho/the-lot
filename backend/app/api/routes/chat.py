from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse, Source
from app.services.embeddings import embed
from app.services.generation import generate_answer
from app.services.vector_store import similarity_search

router = APIRouter()


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    query_embedding = await embed(request.question)
    chunks = await similarity_search(db, query_embedding, top_k=5)

    context_texts = [chunk.text for chunk in chunks]
    answer = await generate_answer(request.question, context_texts)

    sources = [
        Source(
            filename=chunk.document.filename if chunk.document else "unknown",
            text_snippet=chunk.text[:200],
        )
        for chunk in chunks
    ]

    return ChatResponse(answer=answer, sources=sources)
