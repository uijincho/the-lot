# The Lot

An AI-powered audition hub for Drum Corps International (DCI) candidates. Browse corps, find audition dates, get personalized recommendations, and ask questions — all in one place.

Named after *the lot* — the iconic warm-up space at DCI events where members and fans gather before and after shows.

---

## Features

### For Candidates

- **2026 Audition Dates** — Earliest announced audition date for every World Class corps, pulled from the official FloMarching schedule. Dates are shown on each corps card so you know when to start preparing.
- **Personalized Recommendations** — Fill out your profile once (instrument, experience, states you'd travel to) and the dashboard ranks corps by how well they match you. Match percentage shown on every card.
- **World Class & Open Class Sections** — Corps are split into clearly labeled divisions so you can browse the level that fits your goals.
- **Corps History** — Experienced marchers can log every corps they've marched with and the year, surfaced on their profile.
- **State Filter** — Filter corps by audition location. If you can only travel to Texas, you'll see which corps audition there.
- **Card / List View** — Switch between a visual card grid and a compact list view depending on how you like to browse.

### Lucas — AI Chat Assistant

- **Ask anything about DCI** — Lucas is a floating chat widget powered by GPT-4o mini. Ask about audition prep, what to expect at camps, tour life, instrument-specific tips, or corps culture.
- **Profile-aware answers** — If you've filled out your profile, Lucas personalizes responses to your instrument, experience level, corps history, and location.
- **Document-grounded** — When corps documents have been uploaded to the knowledge base, Lucas answers from them directly and cites specific details.
- **Persistent chat** — Conversation history is saved. Logged-in users sync across devices; guests persist in the browser.

### Account & Profile

- **Auth** — Sign up and log in to save your profile and chat history to the cloud.
- **Onboarding** — First-time visitors are walked through a short setup: name, instrument, age, experience level, and which states they'd consider auditioning in.
- **Editable Profile** — Update your details anytime on the Profile page. Changes immediately update your recommendations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS (Vite) |
| Backend | FastAPI (Python) |
| Database | PostgreSQL + pgvector (Railway) |
| Embeddings | OpenAI `text-embedding-3-small` |
| Generation | OpenAI `gpt-4o-mini` |
| Hosting | Vercel (frontend) · Railway (backend + database) |
| Fonts | Inter · Space Grotesk (Google Fonts) |

---

## Project Structure

```
the-lot/
├── backend/
│   ├── app/
│   │   ├── api/routes/     # corps, chat, auth, documents, conversations
│   │   ├── core/           # config, database
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── schemas/        # Pydantic request/response schemas
│   │   └── services/       # embeddings, vector store, generation, ingestion
│   ├── seed.sql            # Full corps seed with 2026 audition dates
│   ├── patch_audition_dates.sql  # Standalone patch to update live DB dates
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    └── src/
        ├── components/     # layout, dashboard, chat, auth, onboarding, profile
        ├── context/        # AuthContext, ChatContext, UserProfileContext
        ├── pages/          # Dashboard, Chat, Profile
        ├── lib/            # API client, recommendation engine, geo utilities
        └── types/          # Corps, UserProfile, ChatMessage
```

---

## Local Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- Docker (for PostgreSQL with pgvector)
- OpenAI API key

### Database

```bash
docker compose up -d
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env — set DATABASE_URL, OPENAI_API_KEY, SECRET_KEY

alembic upgrade head

# Seed corps data (includes 2026 audition dates)
docker exec -i the-lot-db-1 psql -U thelot -d thelot < seed.sql

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

```
DATABASE_URL=postgresql+asyncpg://thelot:thelot@localhost:5433/thelot
OPENAI_API_KEY=sk-...
SECRET_KEY=<random hex string>
```

On Railway, also set `FRONTEND_URL` to your Vercel deployment URL.

---

## Deployment

- **Frontend** — deployed to [Vercel](https://vercel.com). `vercel.json` rewrites API calls to the Railway backend.
- **Backend** — deployed to [Railway](https://railway.app) with root directory set to `backend/`. Uses `DATABASE_URL` with the `postgresql+asyncpg://` scheme.
- **Database** — Railway managed PostgreSQL with the pgvector extension enabled.

To update audition dates on the live database, run `backend/patch_audition_dates.sql` in Railway's Data → Query editor.

---

## API Endpoints

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | — | Create account, returns JWT + user |
| `POST` | `/auth/login` | — | Sign in, returns JWT + user |
| `GET` | `/auth/me` | Required | Get current user + profile |
| `PUT` | `/auth/me` | Required | Update profile (name, instruments, age, experience, states, corps history) |

### Corps
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/corps` | — | List all corps |
| `GET` | `/corps/{id}` | — | Single corps detail |

### Chat
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/chat` | Optional | RAG Q&A — `{"question": "...", "user_context": {...}}` |

### Conversations
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/conversations/current` | Required | Fetch saved chat history |
| `DELETE` | `/conversations/current` | Required | Clear chat history |

### Documents
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/documents/upload` | — | Upload a PDF or `.txt` file to the knowledge base |

### Health
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | — | Health check |

Interactive docs available at `http://localhost:8001/docs`.
