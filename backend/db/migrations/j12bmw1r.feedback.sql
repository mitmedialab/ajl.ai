CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL CHECK(email <> ''),
  response TEXT NOT NULL CHECK(response <> ''),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

---

DROP TABLE feedback
