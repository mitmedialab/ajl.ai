ALTER TABLE annotation_attribute
  ADD type TEXT;

UPDATE annotation_attribute
  SET type = 'select-one'
  WHERE NOT(name = 'Perceived Age');

UPDATE annotation_attribute
  SET type = 'range'
  WHERE name = 'Perceived Age';

DELETE FROM image_annotation
  WHERE annotation_option_id = any(
    SELECT id from annotation_option
      WHERE annotation_attribute_id =
        (SELECT id FROM annotation_attribute WHERE name='Perceived Age')
  );

DELETE FROM annotation_option
  WHERE annotation_attribute_id = (SELECT id FROM annotation_attribute WHERE name='Perceived Age');

INSERT INTO annotation_option (annotation_attribute_id, name, sort_order)
  SELECT
    (SELECT id FROM annotation_attribute WHERE name='Perceived Age') as annotation_attribute_id,
    generate_series(10, 100)::text as name,
    generate_series(10, 100) as sort_order;

---

ALTER TABLE annotation_attribute
  DROP type;


DELETE FROM annotation_option
  WHERE annotation_attribute_id = (SELECT id FROM annotation_attribute WHERE name='Perceived Age');

WITH names (name, sort_order) as (
  VALUES
  ('infant', 1),
  ('child', 2),
  ('young adult', 3),
  ('adult', 4),
  ('elderly', 5)
)
INSERT INTO annotation_option (annotation_attribute_id, name, sort_order)
  SELECT
    (SELECT id FROM annotation_attribute WHERE name='Perceived Age') as annotation_attribute_id,
    name, sort_order
    FROM names;

