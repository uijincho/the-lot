import uuid
from typing import List

from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.corps import Chunk


async def upsert_chunks(
    db: AsyncSession,
    document_id: uuid.UUID,
    texts: List[str],
    embeddings: List[List[float]],
) -> int:
    chunks = [
        Chunk(
            document_id=document_id,
            chunk_index=i,
            text=text_,
            embedding=embedding,
        )
        for i, (text_, embedding) in enumerate(zip(texts, embeddings))
    ]
    db.add_all(chunks)
    await db.commit()
    return len(chunks)


async def similarity_search(
    db: AsyncSession,
    query_embedding: List[float],
    top_k: int = 5,
) -> List[Chunk]:
    result = await db.execute(
        select(Chunk)
        .options(selectinload(Chunk.document))
        .order_by(Chunk.embedding.cosine_distance(query_embedding))
        .limit(top_k)
    )
    return result.scalars().all()
