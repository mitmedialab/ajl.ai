-- https://github.com/voxpelli/node-connect-pg-simple/blob/master/table.sql
CREATE TABLE session (
  sid TEXT NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

---

DROP TABLE session;
