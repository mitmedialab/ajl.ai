-- OLD QUERY
-- SELECT
--   image.id,
--   image.url,
--   image.width,
--   image.height
-- FROM
--   image
-- ORDER BY RANDOM()
-- LIMIT ${limit}

-- NEW QUERY:
-- First, select the total count of annotaiton attributes
WITH attributes as (
  SELECT
    COUNT(*) as count
  FROM
    annotation_attribute
),
-- How many known truths are present for each image
known_count as (
  SELECT
    image_id,
    COUNT(*) as count
  FROM
    known
  GROUP BY image_id
),
-- Each annotator should never see the same image twice
annotator as (
  SELECT
    image_id,
    count(*) as count
  FROM image_annotation
  WHERE annotator_id = ${annotatorId}
  GROUP BY image_id
),
-- Look for images, calculate if we can use them as knowns
-- restrict the images we've annotated, and randomize order
truth_table as (
  SELECT
    image.id,
    image.url,
    image.width,
    image.height,
    COALESCE(known.count = attributes.count, false) as is_known
  FROM
    image
    LEFT JOIN known_count known on image.id = known.image_id
    LEFT JOIN annotator on image.id = annotator.image_id,
    attributes
  WHERE
    annotator.count is null
  ORDER BY RANDOM()
),
-- Select the first "8" (2/3's of the limit) known images
truths as (
  SELECT * FROM truth_table WHERE is_known LIMIT ${numTruths}
),
-- Select a whole "limit" bucket of unknown images
news as (
  SELECT * FROM truth_table WHERE NOT(is_known) LIMIT ${limit}
),
-- Select the union of the known images, and unknown images, limiting to
-- the total limit (so because we "overfilled" the buffer for the unknowns)
-- it will always give us 12 images, with up to `numTruths` truths if we
-- had them...

all_images as (
  SELECT * FROM truths
  UNION ALL
  SELECT * FROM news
  LIMIT ${limit}
)

SELECT * FROM all_images ORDER BY RANDOM();
