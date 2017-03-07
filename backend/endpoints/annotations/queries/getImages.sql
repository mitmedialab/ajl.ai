SELECT
  image.id,
  image.url,
  image.width,
  image.height
FROM
  image
ORDER BY RANDOM()
LIMIT ${limit}
