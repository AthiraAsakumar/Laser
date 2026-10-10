# Lumière Laser Clinic Website

Website for a laser clinic, with an **Angular** frontend and a **Python (FastAPI)** backend.

```
Laser/
├── backend/    FastAPI API + SQLite (treatments, pricing, FAQs, bookings)
└── frontend/   Angular 21 single-page site
```

## Features

- Sections: hero, treatments, about/process, pricing, FAQ, booking + contact
- Treatments, pricing and FAQs are loaded from the API
- Booking form with validation on both the client and the server; bookings are stored in SQLite
- Responsive layout with a mobile menu

## Requirements

- Python 3.11+
- Node.js 22.12+ (Angular 21)

## Deploy locally (one command)

Both options build the Angular site and serve it together with the API at
**http://localhost:8000**.

**Option A: Docker** (only needs [Docker Desktop](https://www.docker.com/products/docker-desktop/))

```bash
docker compose up -d --build     # start
docker compose down              # stop (bookings are kept in the clinic-data volume)
```

**Option B: start script** (needs Python 3.11+ and Node.js 22.12+)

```bash
./start.sh        # macOS / Linux
start.bat         # Windows
```

## Development mode (live reload)

**1. Backend** (http://localhost:8000, API docs at http://localhost:8000/docs)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000
```

**2. Frontend** (http://localhost:4200), in a second terminal

```bash
cd frontend
npm install
npm start
```

The Angular dev server forwards `/api/*` requests to the backend (see `frontend/proxy.conf.json`).

## API

| Method | Path              | Description                |
|--------|-------------------|----------------------------|
| GET    | `/api/health`     | Health check               |
| GET    | `/api/treatments` | List of treatments         |
| GET    | `/api/pricing`    | Pricing plans              |
| GET    | `/api/faqs`       | Frequently asked questions |
| POST   | `/api/bookings`   | Create a booking request   |

## Tests

```bash
cd backend && pytest
```

## Configuration

| Variable         | Default                 | Purpose                         |
|------------------|-------------------------|---------------------------------|
| `CLINIC_DB_PATH` | `backend/clinic.db`     | SQLite database file            |
| `CORS_ORIGINS`   | `http://localhost:4200` | Comma-separated allowed origins |
| `FRONTEND_DIST`  | `frontend/dist/frontend/browser` | Built Angular site served at `/` (if present) |

## Customising

- Clinic content (treatments, prices, FAQs): `backend/app/data.py`
- Clinic name, address, phone, hours: `frontend/src/app/sections/*.ts`
- Colours and fonts: CSS variables at the top of `frontend/src/styles.css`
