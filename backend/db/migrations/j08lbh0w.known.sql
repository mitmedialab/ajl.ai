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
  (690, 1, '{"value":"young adult"}', true),
  (690, 2, '{"value": "female"}', true),
  (690, 3, '{"value": "white"}', true),
  (3060, 1, '{"value":"adult"}', true),
  (3060, 2, '{"value": "female"}', true),
  (3060, 3, '{"value": "black"}',  true),
  (1310, 1, '{"value":"adult"}', true),
  (1310, 2, '{"value": "male"}', true),
  (1310, 3, '{"value": "white"}',  true),
  (2668, 1, '{"value":"adult"}', true),
  (2668, 2, '{"value": "female"}', true),
  (2668, 3, '{"value": "white"}',  true),
  (3368, 1, '{"value":"adult"}', true),
  (3368, 2, '{"value": "female "}', true),
  (3368, 3, '{"value": "white"}',  true),
  (4070, 1, '{"value":"adult"}', true),
  (4070, 2, '{"value": "male"}', true),
  (4070, 3, '{"value": "black"}',  true),
  (2434, 1, '{"value":"adult"}', true),
  (2434, 2, '{"value": "female"}', true),
  (2434, 3, '{"value": "asian"}',  true),
  (1863, 1, '{"value":"adult"}', true),
  (1863, 2, '{"value": "female"}', true),
  (1863, 3, '{"value": "white"}',  true),
  (1979, 1, '{"value":"adult"}', true),
  (1979, 2, '{"value": "male "}', true),
  (1979, 3, '{"value": "white"}',  true),
  (3116, 1, '{"value":"adult"}', true),
  (3116, 2, '{"value": "male"}', true),
  (3116, 3, '{"value": "white"}',  true),
  (2827, 1, '{"value":"adult"}', true),
  (2827, 2, '{"value": "female"}', true),
  (2827, 3, '{"value": " white"}',  true),
  (3528, 1, '{"value":"adult"}', true),
  (3528, 2, '{"value": "male"}', true),
  (3528, 3, '{"value": "not listed"}',  true),
  (826, 1, '{"value":"adult"}', true),
  (826, 2, '{"value": "male"}', true),
  (826, 3, '{"value": "white"}',  true),
  (1515, 1, '{"value":"adult"}', true),
  (1515, 2, '{"value": "male"}', true),
  (1515, 3, '{"value": "white"}',  true),
  (3178, 1, '{"value":"adult"}', true),
  (3178, 2, '{"value": "male"}', true),
  (3178, 3, '{"value": "white"}',  true);


---

DROP TABLE known
