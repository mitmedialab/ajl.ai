SELECT
  known.data,
  known.image_id,
  known.annotation_type_id
FROM
  known
  LEFT JOIN annotation_type ON annotation_type.id = known.annotation_type_id
WHERE
  image_id IN (${imageIds})
