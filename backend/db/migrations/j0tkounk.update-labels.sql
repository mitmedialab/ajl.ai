ALTER TABLE annotation_option
  ADD sort_order INT NOT NULL DEFAULT 0;

UPDATE annotation_option
  SET name = 'Female', sort_order = 1
  WHERE name = 'female';

UPDATE annotation_option
  SET name = 'Male', sort_order = 2
  WHERE name = 'male';

UPDATE annotation_option
  SET name = 'Not Listed', sort_order = 3
  WHERE name = 'androgynous';

UPDATE annotation_option
  SET name = 'Asian', sort_order = 1
  WHERE name = 'asian';

UPDATE annotation_option
  SET name = 'Black', sort_order = 2
  WHERE name = 'black';

UPDATE annotation_option
  SET name = 'Hispanic', sort_order = 3
  WHERE name = 'latino/a';

INSERT INTO annotation_option (annotation_attribute_id, name, sort_order)
  VALUES (3, 'Middle Eastern', 4);

UPDATE annotation_option
  SET name = 'White', sort_order = 5
  WHERE name = 'white';

UPDATE annotation_option
  SET name = 'Not Listed', sort_order = 6
  WHERE name = 'not listed' AND annotation_attribute_id = 3;

UPDATE known
  SET data = '{"name": "Perceived Ethnicity", "value": "Middle Eastern"}'
  WHERE data = '{"name": "Perceived Ethnicity", "value": "not listed"}';

UPDATE known
  SET data = '{"name": "Perceived Ethnicity", "value": "White"}'
  WHERE data = '{"name": "Perceived Ethnicity", "value": "white"}';

UPDATE known
  SET data = '{"name": "Perceived Ethnicity", "value": "Asian"}'
  WHERE data = '{"name": "Perceived Ethnicity", "value": "asian"}';

UPDATE known
  SET data = '{"name": "Perceived Ethnicity", "value": "Black"}'
  WHERE data = '{"name": "Perceived Ethnicity", "value": "black"}';

UPDATE known
  SET data = '{"name": "Perceived Gender", "value": "Male"}'
  WHERE data = '{"name": "Perceived Gender", "value": "male"}';

UPDATE known
  SET data = '{"name": "Perceived Gender", "value": "Female"}'
  WHERE data = '{"name": "Perceived Gender", "value": "female"}';

---
ALTER TABLE annotation_option
  DROP sort_order;

UPDATE annotation_option
  SET name = 'male'
  WHERE name = 'Male';

UPDATE annotation_option
  SET name = 'female'
  WHERE name = 'Female';

UPDATE annotation_option
  SET name = 'androgynous'
  WHERE name = 'Not Listed' AND annotation_attribute_id = 2;

UPDATE annotation_option
  SET name = 'asian'
  WHERE name = 'Asian';

UPDATE annotation_option
  SET name = 'black'
  WHERE name = 'Black';

UPDATE annotation_option
  SET name = 'latino/a'
  WHERE name = 'Hispanic';

DELETE FROM annotation_option
  WHERE name = 'Middle Eastern';

UPDATE annotation_option
  SET name = 'white'
  WHERE name = 'White';

UPDATE annotation_option
  SET name = 'not listed'
  WHERE name = 'Not Listed' AND annotation_attribute_id = 3;

UPDATE known
  SET data = '{"name": "Perceived Ethnicity", "value": "not listed"}'
  WHERE data = '{"name": "Perceived Ethnicity", "value": "Middle Eastern"}';

UPDATE known
  SET data = '{"name": "Perceived Ethnicity", "value": "white"}'
  WHERE data = '{"name": "Perceived Ethnicity", "value": "White"}';

UPDATE known
  SET data = '{"name": "Perceived Ethnicity", "value": "asian"}'
  WHERE data = '{"name": "Perceived Ethnicity", "value": "Asian"}';

UPDATE known
  SET data = '{"name": "Perceived Ethnicity", "value": "black"}'
  WHERE data = '{"name": "Perceived Ethnicity", "value": "Black"}';

UPDATE known
  SET data = '{"name": "Perceived Gender", "value": "male"}'
  WHERE data = '{"name": "Perceived Gender", "value": "Male"}';

UPDATE known
  SET data = '{"name": "Perceived Gender", "value": "female"}'
  WHERE data = '{"name": "Perceived Gender", "value": "Female"}';

