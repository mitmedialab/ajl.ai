SELECT
  count(DISTINCT a.image_id) AS annotated_count,
  count(DISTINCT i.id) AS total_count
FROM
  image i
  LEFT JOIN image_annotation a ON a.image_id = i.id
