#!/usr/bin/env bash
# Build the Angular site and start the clinic website at http://localhost:8000
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Building frontend"
(cd frontend && npm install && npm run build)

echo "==> Setting up backend"
cd backend
if [ ! -d .venv ]; then
  python3 -m venv .venv
fi
.venv/bin/pip install -q -r requirements.txt

echo "==> Website running at http://localhost:8000  (Ctrl+C to stop)"
exec .venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000
