# The Lot

An AI-powered audition assistant for Drum Corps International (DCI) candidates. Ask questions about corps audition requirements, dates, and expectations — and get accurate, source-backed answers.

Named after *the lot* — the iconic warm-up space at DCI events where members and fans gather before and after shows.

---

## Features

- **RAG Q&A** — Ask audition questions and get answers grounded in real corps documents
- **Audition Dashboard** — Browse corps with audition dates, locations, and instrument requirements
- **Document Ingestion** — Upload PDFs or text files to feed the knowledge base

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS (Vite) |
| Backend | FastAPI (Python) |
| Database | PostgreSQL + pgvector |
| Embeddings | OpenAI `text-embedding-3-small` |
| Generation | Anthropic Claude Haiku 4.5 |

---

## Project Structure

```
the-lot/
├── backend/
│   ├── app/
│   │   ├── api/routes/     # corps, chat, documents endpoints
│   │   ├── core/           # config, database
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── schemas/        # Pydantic request/response schemas
│   │   └── services/       # embeddings, vector store, generation, ingestion
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    └── src/
        ├── components/     # layout, dashboard, chat
        ├── pages/          # Dashboard, Chat
        ├── lib/            # API client
        └── types/
```

---

## Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL with the `pgvector` extension
- OpenAI API key
- Anthropic API key

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

# Enable pgvector extension (run once in your database)
psql -d thelot -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Run database migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`. API docs at `http://localhost:8000/docs`.

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
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/thelot
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Usage

1. **Ingest documents** — `POST /documents/upload` with a PDF or `.txt` file containing corps audition info
2. **Ask questions** — use the Chat page or `POST /chat` with `{"question": "..."}`
3. **Browse corps** — the Dashboard pulls from the `corps` table; seed it via `POST /corps` or direct SQL

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/corps` | List all corps |
| `GET` | `/corps/{id}` | Single corps detail |
| `POST` | `/chat` | RAG Q&A |
| `POST` | `/documents/upload` | Upload and ingest a document |
