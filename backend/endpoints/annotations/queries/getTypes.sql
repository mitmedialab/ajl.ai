SELECT
  type.id,
  type.name,
  jsonb_agg(option.name) as options
FROM
  annotation_type type
  LEFT JOIN annotation_option option ON type.id = option.annotation_type_id
GROUP BY
  1,2
