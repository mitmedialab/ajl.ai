CREATE OR REPLACE VIEW image_annotators_count AS
WITH tabulator AS (
  SELECT DISTINCT
    annotator_id,
    image_id,
    flag
  FROM image_annotation ia
    LEFT JOIN annotation_option ao ON ia.annotation_option_id = ao.id
    LEFT JOIN annotation_attribute a ON ao.annotation_attribute_id = a.id ORDER BY image_id
),
counted AS (
  SELECT
    image.id AS image_id,
    COUNT(*) FILTER (WHERE flag) AS flags,
    COUNT(*) FILTER (WHERE NOT flag) AS annotations
  FROM
    image
    LEFT JOIN tabulator ON image.id = tabulator.image_id
  GROUP BY image.id
)
SELECT
  image_id,
  flags,
  annotations,
  annotations > 0 AS started,
  annotations >= 10 AS complete,
  flags > 1 AND flags > annotations AS flagged
FROM counted;

CREATE INDEX image_annotation_image_id ON
  image_annotation (image_id);

ALTER TABLE image
  ADD seed BOOLEAN NOT NULL DEFAULT False;

UPDATE image
  SET seed = True
  WHERE id = ANY(SELECT image_id FROM known);
---

DROP VIEW image_annotators_count;

DROP INDEX image_annotation_image_id;

ALTER TABLE image
  DROP seed;
