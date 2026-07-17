from typing import List, Optional

from openai import AsyncOpenAI

from app.core.config import settings
from app.schemas.chat import UserContext

client = AsyncOpenAI(api_key=settings.openai_api_key)

MODEL = "gpt-4o-mini"

SYSTEM_PROMPT = """You are an expert assistant for Drum Corps International (DCI) audition candidates.
You have deep knowledge of DCI corps, audition processes, marching technique, musical preparation, physical conditioning, and the overall member experience.
Answer questions confidently using your knowledge of DCI. Be specific, practical, and encouraging.
When a candidate profile is provided, personalize your answer to their instrument, experience level, location, and corps history.
When uploaded corps documents are provided as context, treat them as authoritative and cite details from them directly.
If no documents are provided, answer from your general DCI knowledge.
Format responses in clear markdown where helpful — use lists, bold terms, and headings to make answers easy to scan."""


def _build_profile_block(ctx: UserContext) -> str:
    lines = ["**Candidate profile:**"]
    if ctx.name:
        lines.append(f"- Name: {ctx.name}")
    if ctx.instruments:
        lines.append(f"- Section: {', '.join(ctx.instruments)}")
    if ctx.age:
        lines.append(f"- Age: {ctx.age}")
    if ctx.experience:
        label = "Rookie" if ctx.experience == "rookie" else "Experienced member"
        lines.append(f"- Experience: {label}")
    if ctx.corpsHistory:
        history = ", ".join(f"{e.corps} ({e.year})" for e in ctx.corpsHistory)
        lines.append(f"- Corps history: {history}")
    if ctx.states:
        lines.append(f"- Willing to audition in: {', '.join(ctx.states)}")
    return "\n".join(lines)


async def generate_answer(
    question: str,
    context_chunks: List[str],
    user_context: Optional[UserContext] = None,
) -> str:
    parts: List[str] = []

    if user_context:
        parts.append(_build_profile_block(user_context))

    if context_chunks:
        parts.append(
            "**Uploaded corps documents** (treat as authoritative for specific details):\n\n"
            + "\n\n---\n\n".join(context_chunks)
        )

    parts.append(f"**Question:** {question}")

    response = await client.chat.completions.create(
        model=MODEL,
        max_tokens=1024,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": "\n\n".join(parts)},
        ],
    )
    return response.choices[0].message.content
