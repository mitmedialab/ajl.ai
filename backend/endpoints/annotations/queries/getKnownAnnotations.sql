SELECT
  known.data,
  known.image_id,
  annotation_attribute.name as name
FROM
  known
  LEFT JOIN annotation_attribute ON annotation_attribute.id = known.annotation_attribute_id
WHERE
  image_id = ANY(${imageIds})
