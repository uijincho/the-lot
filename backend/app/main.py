from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import corps, chat, documents, auth, conversations

app = FastAPI(title="The Lot API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(corps.router, prefix="/corps", tags=["corps"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(documents.router, prefix="/documents", tags=["documents"])
app.include_router(conversations.router, prefix="/conversations", tags=["conversations"])


@app.get("/health")
async def health():
    return {"status": "ok"}
