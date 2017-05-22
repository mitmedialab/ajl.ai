UPDATE annotation_attribute
  SET name = 'Guess Age'
  WHERE name = 'Perceived Age';

UPDATE annotation_attribute
  SET name = 'Guess Gender'
  WHERE name = 'Perceived Gender';

UPDATE annotation_attribute
  SET name = 'Guess Ethnicity'
  WHERE name = 'Perceived Ethnicity';

---
UPDATE annotation_attribute
  SET name = 'Perceived Age'
  WHERE name = 'Guess Age';

UPDATE annotation_attribute
  SET name = 'Perceived Gender'
  WHERE name = 'Guess Gender';

UPDATE annotation_attribute
  SET name = 'Perceived Ethnicity'
  WHERE name = 'Guess Ethnicity';
