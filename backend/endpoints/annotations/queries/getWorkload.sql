SELECT
  id, images, score
FROM
  workload
WHERE
  annotator_id = ${annotatorId} AND id = ${workloadId}
