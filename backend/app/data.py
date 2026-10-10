"""Static clinic content served by the API."""

TREATMENTS = [
    {
        "id": "hair-removal",
        "name": "Laser Hair Removal",
        "icon": "✦",
        "description": "Long-lasting hair reduction for face and body with diode laser technology, safe for all skin tones.",
        "duration": "30–60 min",
        "sessions": "6–8 sessions",
    },
    {
        "id": "resurfacing",
        "name": "Skin Resurfacing",
        "icon": "◐",
        "description": "Fractional laser treatment to refine texture, soften fine lines and boost collagen production.",
        "duration": "45 min",
        "sessions": "3–5 sessions",
    },
    {
        "id": "pigmentation",
        "name": "Pigmentation & Melasma",
        "icon": "●",
        "description": "Target sun spots, age spots and uneven tone for a brighter, more even complexion.",
        "duration": "30 min",
        "sessions": "3–6 sessions",
    },
    {
        "id": "tattoo-removal",
        "name": "Tattoo Removal",
        "icon": "✕",
        "description": "Pico-second laser breaks down ink particles gently, with minimal risk of scarring.",
        "duration": "15–30 min",
        "sessions": "5–10 sessions",
    },
    {
        "id": "acne-scars",
        "name": "Acne Scar Treatment",
        "icon": "❖",
        "description": "Reduce the depth and visibility of acne scars and restore smoother skin.",
        "duration": "45 min",
        "sessions": "4–6 sessions",
    },
    {
        "id": "rejuvenation",
        "name": "Skin Rejuvenation",
        "icon": "◇",
        "description": "Laser facials that reduce redness and visible veins and leave skin glowing.",
        "duration": "30 min",
        "sessions": "3–4 sessions",
    },
]

PRICING = [
    {
        "name": "Small Area",
        "price": 49,
        "features": ["Upper lip or chin", "Underarms", "Free consultation"],
        "featured": False,
    },
    {
        "name": "Medium Area",
        "price": 99,
        "features": ["Full face or bikini line", "Half arms or lower legs", "Free patch test"],
        "featured": True,
    },
    {
        "name": "Large Area",
        "price": 179,
        "features": ["Full legs or full back", "Full arms", "Aftercare kit included"],
        "featured": False,
    },
]

FAQS = [
    {
        "question": "Does laser treatment hurt?",
        "answer": "Most clients describe a mild snapping or warm sensation. Our lasers have built-in cooling to keep you comfortable throughout.",
    },
    {
        "question": "How many sessions will I need?",
        "answer": "It depends on the treatment, area and your skin and hair type. Most hair removal plans need 6–8 sessions spaced 4–6 weeks apart. Your consultant will give you a personalised estimate.",
    },
    {
        "question": "Is laser safe for darker skin tones?",
        "answer": "Yes. We use lasers suitable for all skin types, and a patch test is always done first to confirm safe settings for your skin.",
    },
    {
        "question": "Is there any downtime?",
        "answer": "Most treatments have little to no downtime. Some redness may occur for a few hours. Resurfacing treatments may need 2–5 days of recovery.",
    },
    {
        "question": "How should I prepare for my session?",
        "answer": "Avoid sun exposure and tanning for 2 weeks before treatment, and shave the area 24 hours beforehand for hair removal. Do not wax or pluck.",
    },
]

TREATMENT_IDS = {t["id"] for t in TREATMENTS} | {"consultation"}
