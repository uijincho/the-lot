# The Lot

An AI-powered audition assistant for Drum Corps International (DCI) candidates. Ask questions about corps audition requirements, dates, and expectations — and get accurate, source-backed answers.

Named after *the lot* — the iconic warm-up space at DCI events where members and fans gather before and after shows.

---

## Features

- **Personalized Onboarding** — First-time visitors enter their name, instrument, age, experience, and which states they'd travel to audition in. Stored in a browser cookie for 365 days.
- **Corps History** — Experienced marchers can search and log every corps they've marched with the year, surfaced on their profile.
- **Smart Dashboard** — Corps cards filtered by the user's selected states and ranked by instrument match, with a "Recommended for You" section highlighting the best fits.
- **RAG Q&A** — Ask audition questions and get answers grounded in real corps documents.
- **Document Ingestion** — Upload PDFs or text files to feed the knowledge base.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS (Vite) |
| Backend | FastAPI (Python) |
| Database | PostgreSQL + pgvector |
| Embeddings | OpenAI `text-embedding-3-small` |
| Generation | Anthropic Claude Haiku 4.5 |
| Storage | Browser cookies (365-day profile persistence) |

---

## Project Structure

```
the-lot/
├── backend/
│   ├── app/
│   │   ├── api/routes/     # corps, chat, documents endpoints
│   │   ├── core/           # config, database
│   │   ├── models/         # SQLAlchemy ORM models (Corps, Document, Chunk)
│   │   ├── schemas/        # Pydantic request/response schemas
│   │   └── services/       # embeddings, vector store, generation, ingestion
│   ├── seed.sql            # 5 sample DCI corps
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    └── src/
        ├── components/     # layout, dashboard, chat, onboarding
        ├── context/        # UserProfileContext
        ├── hooks/          # useUserProfile (cookie read/write)
        ├── pages/          # Dashboard, Chat
        ├── lib/            # API client, geo utilities
        └── types/          # Corps, UserProfile, ChatMessage
```

---

## Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- Docker (for PostgreSQL with pgvector)
- OpenAI API key
- Anthropic API key

### Database

```bash
# Start PostgreSQL with pgvector via Docker
docker compose up -d
```

The `pgvector` extension is enabled automatically on first migration.

### Backend

```bash
cd backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your values

# Run database migrations
alembic upgrade head

# Seed sample corps data
docker exec -i the-lot-db-1 psql -U thelot -d thelot < seed.sql

# Start the server
uvicorn app.main:app --port 8001 --reload
```

API docs at `http://localhost:8001/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Environment Variables

Create `backend/.env` from `backend/.env.example`:

```
DATABASE_URL=postgresql+asyncpg://thelot:thelot@localhost:5433/thelot
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Usage

1. **Visit the app** — the onboarding modal appears on first visit; fill in your profile or skip
2. **Select states** — choose which states you'd travel to audition in; the Dashboard filters corps accordingly
3. **Browse corps** — the Dashboard shows "Recommended for You" corps that match your instrument, plus all others in your states
4. **Ingest documents** — `POST /documents/upload` via `http://localhost:8001/docs` with a PDF or `.txt` file
5. **Ask questions** — use the Chat page to ask anything about audition requirements, repertoire, and expectations

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/corps` | List all corps |
| `GET` | `/corps/{id}` | Single corps detail |
| `POST` | `/chat` | RAG Q&A — `{"question": "..."}` |
| `POST` | `/documents/upload` | Upload and ingest a PDF or .txt file |
