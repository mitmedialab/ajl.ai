SELECT
  known.data,
  known.image_id,
  annotation_type.name as name
FROM
  known
  LEFT JOIN annotation_type ON annotation_type.id = known.annotation_type_id
WHERE
  image_id = ANY(${imageIds})
