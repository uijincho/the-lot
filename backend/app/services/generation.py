from typing import List

import anthropic

from app.core.config import settings

client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)

MODEL = "claude-haiku-4-5-20251001"

SYSTEM_PROMPT = """You are an expert assistant helping Drum Corps International (DCI) audition candidates.
Answer questions clearly and accurately using only the provided context from official corps audition materials.
If the context does not contain enough information to answer the question, say so honestly.
Keep answers concise and focused on what the candidate needs to know."""


async def generate_answer(question: str, context_chunks: List[str]) -> str:
    context = "\n\n---\n\n".join(context_chunks)
    message = await client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": f"Context from audition materials:\n\n{context}\n\nQuestion: {question}",
            }
        ],
    )
    return message.content[0].text
