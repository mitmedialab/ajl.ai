SELECT
  attr.id,
  attr.name,
  attr.type,
  attr.sort_order,
  jsonb_agg(option.name ORDER BY option.sort_order) as options,
  attr.flag

FROM
  annotation_attribute attr
  LEFT JOIN annotation_option option ON attr.id = option.annotation_attribute_id
GROUP BY
  attr.id, attr.name, attr.type
