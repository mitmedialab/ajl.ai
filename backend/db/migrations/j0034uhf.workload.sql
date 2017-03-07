CREATE TABLE workload (
  id SERIAL PRIMARY KEY,
  annotator_id INTEGER NOT NULL REFERENCES annotator(id),
  images jsonb
);

ALTER TABLE image_annotation
  ADD workload_id INTEGER NOT NULL REFERENCES workload(id)
---

ALTER TABLE image_annotation
  DROP workload_id;

DROP TABLE workload
