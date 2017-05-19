INSERT INTO annotation_option (annotation_attribute_id, name, sort_order) VALUES
  (3, 'South Asian', 6);

UPDATE annotation_option
  SET sort_order = 7
  WHERE name = 'Not Listed';

---
DELETE FROM annotation_option WHERE
  name = 'South Asian';

UPDATE annotation_option
  SET sort_order = 6
  WHERE name = 'Not Listed';
