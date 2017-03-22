ALTER TABLE annotation_type
  RENAME TO annotation_attribute;

ALTER SEQUENCE annotation_type_id_seq RENAME TO annotation_attribute_id_seq;

ALTER TABLE annotation_attribute
  RENAME CONSTRAINT annotation_type_pkey TO annotation_attribute_pkey;

ALTER TABLE annotation_option
  RENAME annotation_type_id TO annotation_attribute_id;

ALTER TABLE annotation_option
  RENAME CONSTRAINT annotation_option_annotation_type_id_fkey TO annotation_option_annotation_attribute_id_fkey;

ALTER TABLE known
  RENAME annotation_type_id TO annotation_attribute_id;

ALTER TABLE known
  RENAME CONSTRAINT known_annotation_type_id_fkey TO known_annotation_attribute_id_fkey;
---
ALTER TABLE annotation_attribute
  RENAME CONSTRAINT annotation_attribute_pkey TO annotation_type_pkey;

ALTER TABLE annotation_attribute
  RENAME TO annotation_type;

ALTER SEQUENCE annotation_attribute_id_seq RENAME TO annotation_type_id_seq;

ALTER TABLE annotation_option
  RENAME annotation_attribute_id TO annotation_type_id;

ALTER TABLE annotation_option
  RENAME CONSTRAINT annotation_option_annotation_attribute_id_fkey TO annotation_option_annotation_type_id_fkey;

ALTER TABLE known
  RENAME annotation_attribute_id TO annotation_type_id;

ALTER TABLE known
  RENAME CONSTRAINT known_annotation_attribute_id_fkey TO known_annotation_type_id_fkey;
