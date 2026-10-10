import os
from contextlib import asynccontextmanager
from datetime import date

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from .data import FAQS, PRICING, TREATMENT_IDS, TREATMENTS
from .db import get_conn, init_db


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


app = FastAPI(title="Lumière Laser Clinic API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "http://localhost:4200").split(","),
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class BookingIn(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=25, pattern=r"^[0-9+()\-\s]+$")
    treatment: str
    preferred_date: date
    message: str | None = Field(default=None, max_length=1000)


class BookingOut(BookingIn):
    id: int


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/treatments")
def list_treatments():
    return TREATMENTS


@app.get("/api/pricing")
def list_pricing():
    return PRICING


@app.get("/api/faqs")
def list_faqs():
    return FAQS


@app.post("/api/bookings", response_model=BookingOut, status_code=201)
def create_booking(booking: BookingIn):
    if booking.treatment not in TREATMENT_IDS:
        raise HTTPException(status_code=422, detail="Unknown treatment")
    if booking.preferred_date < date.today():
        raise HTTPException(status_code=422, detail="Preferred date cannot be in the past")
    with get_conn() as conn:
        cur = conn.execute(
            "INSERT INTO bookings (name, email, phone, treatment, preferred_date, message)"
            " VALUES (?, ?, ?, ?, ?, ?)",
            (
                booking.name.strip(),
                booking.email,
                booking.phone.strip(),
                booking.treatment,
                booking.preferred_date.isoformat(),
                booking.message,
            ),
        )
        booking_id = cur.lastrowid
    return BookingOut(id=booking_id, **booking.model_dump())
