UPDATE image SET url = replace(url, 'http://www.code4rights.com', 'https://s3.amazonaws.com/image-annotator-assets');

---
UPDATE image SET url = replace(url, 'https://s3.amazonaws.com/image-annotator-assets', 'http://www.code4rights.com');
