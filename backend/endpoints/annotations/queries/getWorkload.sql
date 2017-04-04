SELECT
  id, images, created_at, submitted_at
FROM
  workload
WHERE
  annotator_id = ${annotatorId} AND id = ${workloadId}
