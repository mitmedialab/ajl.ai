### get /api/annotations/types
returns a JSON list of possible annotation types, eg:

```
"[{
  "id":1,
  "name":"Perceived Age",
  "options":["infant","child","young adult","adult","elderly"]
},
{
  "id":2,
  "name":"Perceived Gender",
  "options":["androgynous","female","male"]
},
{
  "id":3,
  "name":"Perceived Ethnicity",
  "options":["black","white","lantino/a","asian","not listed"]
}]"
```

### get /api/annotations/workload
Prior to session enrollment this endpoint returns a JSON workload of 12 random images to be annotated (with 8 known and 4 unknown images randomly interspersed), eg:

```
"[{
  "id":2,
  "images":[
    {
      "id":241,
      "url":"http://www.code4rights.com/lfw_subjects/Ann_Veneman_0001.jpg",
      "width":250,
      "height":250
    },
    {
      "id":2904,
      "url":"http://www.code4rights.com/lfw_subjects/Narayan_Singh_Pun_0001.jpg",
      "width":250,
      "height":250
    }
    ... {12th image object}
  ]
}]"
```
Session enrollment occurs when an active session successfully annotates 12 images, and gets the 8 hidden known ground truths right. Once a session has successfully posted 12 annotated images back to the api and gotten the 8 hidden known ground truths correct, the session is considered enrolled, and all future requests from that session receive a response with a workload of 3 images containing 2 known and 1 unknown image.

### post /api/annotations
Expects the following JSON post:

```
"workloadId":1,
"images":[
  {
    "id":1,
    "annotations":[
      {"name":"Perceived Age","value":"adult"},
      {"name":"Perceived Gender","value":"androgynous"},
      {"name":"Perceived Ethnicity","value":"white"}
    ]
  },{
    "id":2,
    "annotations":[
      {"name":"Perceived Age","value":"young adult"},
      {"name":"Perceived Gender","value":"male"},
      {"name":"Perceived Ethnicity","value":"black"}
    ]
  }
  ...{the last object}
]}"
```
This post must contain only and all annotations for images sent to the current session. If there is a discrepancy between the current workload sent to the current session's annotation post, the post will return an error 500.

Coming soon:
If the annotation post is accepted the response object will contain the new workload.

You can test this enpoint with the following fetch call:

```
fetch("/api/annotations", {
  method: "POST",
  body: json,
  "credentials": "include",
  headers: {
    "Content-Type": "application/json"
  }
});
```
