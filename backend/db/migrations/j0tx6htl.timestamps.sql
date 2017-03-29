ALTER TABLE workload
 ADD created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE workload
 ADD submitted_at TIMESTAMPTZ;

---

ALTER TABLE workload
 DROP created_at;

ALTER TABLE workload
 DROP submitted_at;
