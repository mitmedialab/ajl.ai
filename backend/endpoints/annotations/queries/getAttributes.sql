SELECT
  attr.id,
  attr.name,
  jsonb_agg(option.name) as options
FROM
  annotation_attribute attr
  LEFT JOIN annotation_option option ON attr.id = option.annotation_attribute_id
GROUP BY
  1,2
