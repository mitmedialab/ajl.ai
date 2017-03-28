WITH previous_work AS (
  SELECT count(*) as complete_count
    FROM workload
  WHERE annotator_id = ${annotatorId}
    AND NOT(score IS NULL)
)
INSERT INTO workload (annotator_id, images, complete_count)
SELECT
  ${annotatorId} as annotator_id,
  ${images:json} as images,
  complete_count
FROM previous_work
RETURNING id, images, complete_count
