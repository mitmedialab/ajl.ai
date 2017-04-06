SELECT
  COUNT(*) AS total_count,
  COUNT(*) FILTER (WHERE started) AS annotated_count,
  COUNT(*) FILTER (WHERE complete) AS complete_count
FROM
  image_annotators_count;
