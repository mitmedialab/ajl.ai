# Image Annotator

## Repository Structure

- `backend` - back-end api written in node/express/postgress
- `frontend` - front-end client written in react/redux/webpack
- `jest` - unit and integration tests
- `prototypes/` - exploratory interaction prototypes
    + `fabric-test/` - prototypes using [fabric.js](http://fabricjs.com/) for rendering
    + `paper-test/` - prototype using [Paper.js](http://paperjs.org) for rendering
    + `snap-svg-test/` - prototype using SVG to render landmarks
- `sample-data` - initial sample data from researchers
- `static` - initial static data for testing
- `api.md` - REST API reference documentation

## REST API
This project exposes a REST API with the following endpoints:
* get /api/annotations/types
* get /api/annotations/workload
* post /api/annotations

More information available in [api.md](blob/master/api.md).

## Installation
### Frontend
The front end is running React, Redux, Webpack.

Run `npm install` to install all front-end dependencies; then run `npm start` to launch the webpack dev server. The application will then be available at [localhost:8080](http://localhost:8080).

The front end currently needs the local node/postgres backend running (installation instructions below).

#### Other commands

These commands are available after installation within the `image-annotator/` directory:

- `npm test`: run unit tests with Jest, then lint on exit
- `npm run lint`: run ESLint to identify syntax & style issues in the code
- `npm run build`: generate a static build into `image-annotator/dist`


### backend
The backend is running node, Postgres and an express based set of middlewares for the REST API we expose.

The app must be pointed at a running postgres server. Default config will use the db name `image-annotator`, and a set of sensible connection defaults, but if you need to, you can configure all the connection parameters in the `.gitignored` `.env` file. For example:

```
PGHOST=localhost
PGPORT=5432
PGNAME=image-annotator
PGUSER=postgres
PGPASS=*****
# if specified, DATABASE_URL overides all of the above
DATABASE_URL=
```

#### Installing postgres
##### Ubuntu 16 dev environment setup:
$ sudo apt-get install postgresql

$ sudo su postgres

$ CREATE DATABASE image-annotator;

$ sudo service postgresql stop

$ sudo vim /etc/postgresql/9.5/main/pg_hba.conf

```
  # "local" is for Unix domain socket connections only
  local   all             all                                     trust
  # IPv4 local connections:
  host    all             all             127.0.0.1/32            trust
  # IPv6 local connections:
  host    all             all             ::1/128                 trust
```
$ sudo service postgresql start

create a .env file in the project root and add the following to it:
```
PGUSER=postgres
```

npm run migrate:up

##### Instructions for Mac OS dev environment setup:
_The postgres installation step assumes you are using the [Homebrew](https://brew.sh/) package manager_

$ brew install postgresql

$ brew services start postgresql

$ createdb image-annotator

_(on subsequent runs PostgreSQL should now auto-start)_

$ npm run migrate:up

### Running the prototypes
`cd` into the prototypes directory you want to look at and run `npm start` (Requires python, equivalent to running `python -m SimpleHTTPServer 8000`) or a comparable static web server.

Navigate to the following prototypes in your browser:
* test on 25 sample landmarked images of faces [sample-data-rotate-regions](http://localhost:8000/prototypes/fabric-test/sample-data-rotate-regions.html)
* UI experiment for three annotation modes: [general fabric.js test](http://localhost:8000/prototypes/fabric-test/)

## Glossary of Terms

This section clarifies the verbiage and terms used within the application code.

### Attribute

An **attribute** is the object representing a specific type of annotation a user will apply to any given image, such as demographic attributes like "perceived ethnicity" or positional attributes like "the location of the right eye."

Attribute properties:

- **Name**: the human-oriented label of an attribute, such as "Perceived Gender."
- **Type**: the type of data represented by the attribute, *e.g.* a list of multiple-choice options, or a set of coordinates, etc. _Note: This is a database- / data model-oriented value, and has no inherent correspondence to front-end presentation._
- **Options**: the list of accepted values for a multiple-choice image attribute.

Attribute objects have the shape
```json
{
    "name": "Attribute Name",
    "type": "type-of-data",
    "options": ["list", "of", "accepted", "values", "for", "multiple", "choice", "attributes"]
}
```

### Annotation

An **image annotation** is the object representing the value of a specific attribute a user applied to a specific image.

Image annotation properties:

- **Name**: the name of the image attribute annotated, such as "Perceived Ethnicity".
- **Value**: the value with which the image is annotated, such as "Asian" or "Black."

Annotation objects have the shape
```json
{
    "id": "numeric-image-id",
    "annotations": [{
        "name": "Attribute Name",
        "value": "selected-value"
    }, {
        "name": "Another Attribute Name",
        "value": "selected-value"
    }]
}
```
