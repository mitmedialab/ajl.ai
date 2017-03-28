ALTER TABLE workload
 ADD created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE image_annotation
 ADD created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

---

ALTER TABLE workload
 DROP created_at;

ALTER TABLE image_annotation
 DROP created_at;
