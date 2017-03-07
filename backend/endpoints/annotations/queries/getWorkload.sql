SELECT
  images
FROM
  workload
WHERE
  annotator_id = ${annotatorId} AND id = ${workloadId}
