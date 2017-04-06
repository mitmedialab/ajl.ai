ALTER TABLE annotation_attribute
  ADD flag BOOLEAN NOT NULL DEFAULT False;

INSERT INTO annotation_attribute (id, name, type, flag)
  VALUES (4, 'Report Image', 'select-one', True);

WITH flags (name, sort_order) AS (
  VALUES
    ('Unclear Subject', 1),
    ('No Subject in Picture', 2),
    ('Inappropriate Content', 3)
)
INSERT INTO annotation_option (annotation_attribute_id, name, sort_order)
  SELECT
    (SELECT id FROM annotation_attribute WHERE name='Report Image') as annotation_attribute_id,
    name,
    sort_order
  FROM flags;
---

ALTER TABLE annotation_attribute
  DROP flag;

DELETE FROM image_annotation
  WHERE annotation_option_id = ANY(
    SELECT id
    FROM
      annotation_option
      LEFT JOIN annotation_attribtue ON
        annotation_option.annotation_attribtue_id = annotation_attribute.id
    WHERE name='Report Image'
  );

DELETE FROM annotation_option
  WHERE annotation_attribute_id = (SELECT id from annotation_attribute WHERE name='Report Image');

DELETE FROM annotation_attribute
  WHERE name = 'Report Image';
