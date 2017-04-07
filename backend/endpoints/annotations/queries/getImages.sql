WITH

-- Get a count for how many annotations this annotator has put on each image
annotator AS (
  SELECT
    image_id,
    COUNT(*) as count
  FROM image_annotation
  WHERE
    annotator_id = ${annotatorId}
  GROUP BY image_id
),

-- Get a list of all images, removing flagged images, ordering them in "rough priority order"
all_images AS (
  SELECT
    image.id,
    image.url,
    image.width,
    image.height,
    image.seed as is_known,
    annotator.count as self_count
  FROM
    image
    LEFT JOIN annotator ON image.id = annotator.image_id
    LEFT JOIN image_annotators_count crowd ON image.id = crowd.image_id
  WHERE NOT crowd.flagged
  -- Sort images this annotator hasn't annotated first
  ORDER BY annotator.count NULLS FIRST,
  -- Images that are not "complete" by the crowd source table
    crowd.complete,
  -- Images that have been "started" first
    crowd.started DESC
),

-- Limit the previous select to a few thousand of the
-- sorted images per known/unknown
known_bucket AS (
  SELECT * FROM all_images
  WHERE is_known
  LIMIT 1000
),
unknown_bucket AS (
  SELECT * FROM all_images
  WHERE NOT is_known
  LIMIT 2000
),

-- Select the right number of known/unknowns at random from the buckets
knowns AS (
  SELECT * FROM known_bucket
  ORDER BY self_count NULLS FIRST, RANDOM()
  LIMIT ${numTruths}
),
news AS (
  SELECT * FROM unknown_bucket
  ORDER BY self_count NULLS FIRST, RANDOM()
  LIMIT ${limit}
),
combined AS (
  SELECT * FROM knowns UNION SELECT * FROM news
),
final_workload AS (
  SELECT * FROM combined ORDER BY is_known DESC LIMIT ${limit}
)

-- Randomize the final selection so all the known images don't show up first every time
SELECT
  id, url, width, height, is_known
FROM final_workload ORDER BY RANDOM();
