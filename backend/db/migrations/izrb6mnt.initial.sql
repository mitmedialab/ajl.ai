CREATE TABLE annotater (
  id SERIAL PRIMARY KEY,
  city TEXT
);

CREATE TABLE image (
  id SERIAL PRIMARY KEY,
  url TEXT,
  width INTEGER,
  height INTEGER
);

CREATE TABLE annotation_type (
  id SERIAL PRIMARY KEY,
  name TEXT
);
INSERT INTO annotation_type (name) VALUES
  ('Perceived Age'),
  ('Perceived Gender'),
  ('Perceived Skintone');

CREATE TABLE annotation_option (
  id SERIAL PRIMARY KEY,
  annotation_type_id INTEGER NOT NULL REFERENCES annotation_type(id),
  name TEXT NOT NULL
);
INSERT INTO annotation_option (annotation_type_id, name) VALUES
  (1, 'infant'),
  (1, 'child'),
  (1, 'young adult'),
  (1, 'adult'),
  (1, 'elderly'),
  (2, 'other'),
  (2, 'female'),
  (2, 'male'),
  (3, 'skintone1'),
  (3, 'skintone2'),
  (3, 'skintone3'),
  (3, 'skintone4'),
  (3, 'skintone5');

CREATE TABLE image_annotation (
  id SERIAL PRIMARY KEY,
  annotater_id INTEGER NOT NULL REFERENCES annotater(id),
  image_id INTEGER NOT NULL REFERENCES image(id),
  annotation_option_id INTEGER NOT NULL REFERENCES annotation_option(id)
);

CREATE TABLE landmark (
  id SERIAL PRIMARY KEY,
  numbering INTEGER,
  region INTEGER
);
INSERT INTO landmark (numbering, region) VALUES
  (1, null),
  (2, null),
  (3, null),
  (4, null),
  (5, null),
  (6, null),
  (7, null),
  (8, null),
  (9, null),
  (10, null),
  (11, null),
  (12, null),
  (13, null),
  (14, null),
  (15, null),
  (16, null),
  (17, null),
  (18, null),
  (19, null),
  (20, null),
  (21, null),
  (22, null),
  (23, null),
  (24, null),
  (25, null),
  (26, null),
  (27, null),
  (28, 1),
  (29, 1),
  (30, 1),
  (31, 1),
  (32, 1),
  (33, 1),
  (34, 1),
  (35, 1),
  (36, 2),
  (37, 2),
  (38, 2),
  (39, 2),
  (40, 2),
  (41, 2),
  (42, 2),
  (43, 3),
  (44, 3),
  (45, 3),
  (46, 3),
  (47, 3),
  (48, 3),
  (49, 4),
  (50, 4),
  (51, 4),
  (52, 4),
  (53, 4),
  (54, 4),
  (55, 4),
  (56, 4),
  (57, 4),
  (58, 4),
  (59, 4),
  (60, 4),
  (61, 4),
  (62, 4),
  (63, 4),
  (64, 4),
  (65, 4),
  (66, 4),
  (67, 4),
  (68, 4);

CREATE TABLE image_landmark_annotation (
  id SERIAL PRIMARY KEY,
  image_id INTEGER NOT NULL REFERENCES image(id),
  landmark_id INTEGER NOT NULL REFERENCES landmark(id),
  annotater_id INTEGER NOT NULL REFERENCES annotater(id),
  x INTEGER NOT NULL,
  y INTEGER NOT NULL
);

---

DROP TABLE image_landmark_annotation;
DROP TABLE landmark;
DROP TABLE image_annotation;
DROP TABLE annotation_option;
DROP TABLE annotation_type;
DROP TABLE annotater;
DROP TABLE image;
