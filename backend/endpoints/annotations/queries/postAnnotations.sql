INSERT into image_annotation
  (annotator_id, image_id, workload_id, annotation_option_id)

(
  SELECT
    ${annotatorId} as annotator_id,
    ${imageId} as image_id,
    ${workloadId} as workload_id,
    annotation_option.id as annotation_option_id
  FROM annotation_option
    LEFT JOIN annotation_type ON annotation_option.annotation_type_id = annotation_type.id
  WHERE annotation_option.name = ${value} AND annotation_type.name = ${name}
)
