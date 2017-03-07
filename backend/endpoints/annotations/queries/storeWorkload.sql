INSERT INTO workload (annotator_id, images)
VALUES (${annotatorId}, ${images:json})
RETURNING id, images
