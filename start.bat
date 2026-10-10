@echo off
REM Build the Angular site and start the clinic website at http://localhost:8000
setlocal
cd /d "%~dp0"

echo ==^> Building frontend
pushd frontend
call npm install || goto :error
call npm run build || goto :error
popd

echo ==^> Setting up backend
pushd backend
if not exist .venv (
  python -m venv .venv || goto :error
)
call .venv\Scripts\pip install -q -r requirements.txt || goto :error

echo ==^> Website running at http://localhost:8000  (Ctrl+C to stop)
call .venv\Scripts\uvicorn app.main:app --host 127.0.0.1 --port 8000
popd
goto :eof

:error
echo Startup failed.
exit /b 1
