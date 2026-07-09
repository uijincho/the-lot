import uuid
from typing import List

from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.corps import Document
from app.services.embeddings import embed_batch
from app.services.vector_store import upsert_chunks

CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

splitter = RecursiveCharacterTextSplitter(
    chunk_size=CHUNK_SIZE,
    chunk_overlap=CHUNK_OVERLAP,
)


def extract_text(file_bytes: bytes, filename: str) -> str:
    if filename.lower().endswith(".pdf"):
        import io
        reader = PdfReader(io.BytesIO(file_bytes))
        return "\n".join(page.extract_text() or "" for page in reader.pages)
    return file_bytes.decode("utf-8", errors="ignore")


def chunk_text(text: str) -> List[str]:
    return splitter.split_text(text)


async def ingest_document(
    db: AsyncSession,
    file_bytes: bytes,
    filename: str,
    corps_id: uuid.UUID = None,
) -> Document:
    text = extract_text(file_bytes, filename)
    chunks = chunk_text(text)

    doc = Document(filename=filename, corps_id=corps_id, chunk_count=len(chunks))
    db.add(doc)
    await db.flush()

    embeddings = await embed_batch(chunks)
    await upsert_chunks(db, doc.id, chunks, embeddings)

    doc.chunk_count = len(chunks)
    await db.commit()
    await db.refresh(doc)
    return doc
