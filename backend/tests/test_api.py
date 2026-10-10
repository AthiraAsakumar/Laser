from datetime import date, timedelta

import pytest
from fastapi.testclient import TestClient


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setattr("app.db.DB_PATH", tmp_path / "test.db")
    from app.main import app

    with TestClient(app) as c:
        yield c


def valid_booking(**overrides):
    data = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+1 555 123 4567",
        "treatment": "hair-removal",
        "preferred_date": (date.today() + timedelta(days=3)).isoformat(),
        "message": "First visit",
    }
    data.update(overrides)
    return data


def test_content_endpoints(client):
    assert len(client.get("/api/treatments").json()) == 6
    assert len(client.get("/api/pricing").json()) == 3
    assert len(client.get("/api/faqs").json()) == 5


def test_create_booking(client):
    res = client.post("/api/bookings", json=valid_booking())
    assert res.status_code == 201
    assert res.json()["id"] == 1


@pytest.mark.parametrize(
    "overrides",
    [
        {"email": "not-an-email"},
        {"treatment": "unknown"},
        {"phone": "abc"},
        {"preferred_date": (date.today() - timedelta(days=1)).isoformat()},
    ],
)
def test_invalid_booking(client, overrides):
    assert client.post("/api/bookings", json=valid_booking(**overrides)).status_code == 422
