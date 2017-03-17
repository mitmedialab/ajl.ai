CREATE TABLE known (
  id SERIAL PRIMARY KEY,
  image_id INTEGER NOT NULL REFERENCES image(id),
  annotation_type_id INTEGER NOT NULL REFERENCES annotation_type(id),
  data JSONB NOT NULL,
  is_seed BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(image_id, annotation_type_id)
);

  -- (1, 'Perceived Age'),
  -- (2, 'Perceived Gender'),
  -- (3, 'Perceived Ethnicity');

INSERT INTO known (image_id, annotation_type_id, data, is_seed) VALUES
  (690, 1, '{"name":"Perceived Age", "value":"young adult"}', true),
  (690, 2, '{"name":"Perceived Gender", "value":"female"}', true),
  (690, 3, '{"name":"Perceived Ethnicity", "value":"white"}', true),
  (3060, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (3060, 2, '{"name":"Perceived Gender", "value":"female"}', true),
  (3060, 3, '{"name":"Perceived Ethnicity", "value":"black"}',  true),
  (1310, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (1310, 2, '{"name":"Perceived Gender", "value":"male"}', true),
  (1310, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (2668, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (2668, 2, '{"name":"Perceived Gender", "value":"female"}', true),
  (2668, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (3368, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (3368, 2, '{"name":"Perceived Gender", "value":"female"}', true),
  (3368, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (4070, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (4070, 2, '{"name":"Perceived Gender", "value":"male"}', true),
  (4070, 3, '{"name":"Perceived Ethnicity", "value":"black"}',  true),
  (2434, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (2434, 2, '{"name":"Perceived Gender", "value":"female"}', true),
  (2434, 3, '{"name":"Perceived Ethnicity", "value":"asian"}',  true),
  (1863, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (1863, 2, '{"name":"Perceived Gender", "value":"female"}', true),
  (1863, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (1979, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (1979, 2, '{"name":"Perceived Gender", "value":"male"}', true),
  (1979, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (3116, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (3116, 2, '{"name":"Perceived Gender", "value":"male"}', true),
  (3116, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (2827, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (2827, 2, '{"name":"Perceived Gender", "value":"female"}', true),
  (2827, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (3528, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (3528, 2, '{"name":"Perceived Gender", "value":"male"}', true),
  (3528, 3, '{"name":"Perceived Ethnicity", "value":"not listed"}',  true),
  (826, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (826, 2, '{"name":"Perceived Gender", "value":"male"}', true),
  (826, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (1515, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (1515, 2, '{"name":"Perceived Gender", "value":"male"}', true),
  (1515, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true),
  (3178, 1, '{"name":"Perceived Age", "value":"adult"}', true),
  (3178, 2, '{"name":"Perceived Gender", "value":"male"}', true),
  (3178, 3, '{"name":"Perceived Ethnicity", "value":"white"}',  true);


---

DROP TABLE known
