# Image Annotator
This tool is a work in progress collaboration between [MIT Civic Media](https://civic.mit.edu) and [Bocoup](http://bocoup.com/about) to build an
open source tool for crowd sourcing image annotation. Our first campaign with the

tool is focused on annotating demographics in [IMDB-Wiki](https://data.vision.ee.ethz.ch/cvl/rrothe/imdb-wiki/),
the largest academic face data set used by computer vision researchers, in order
to measure bias in that data set.

You can checkout that campaign at [ajl.ai](https://ajl.ai).

This repo is currently structured as a base open source annotator, and the
IMDB-wiki annotation campaign together.

In the future, we'll be working to publish reusable image annotation tools,
along with our data and findings. In the meantime, this is a pretty good
starting point if you're looking to run a large scale crowd image annotation
campaign.  

## Repository Structure

- `ansible` - deployment scripts for running the application on Ubuntu 16 server
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

## Deployment & Reporting
Image Annotator is configured to be deployable on any Ubuntu 16 server. All
you need is Ansible 2.2x and root access to your desired target machine.

The current IMDB-wiki campaign is deployed to Bocoup's infrastructure which is orchastrated from [bocoup/infrastructure-foundation](https://github.com/bocoup/infrastructure-foundation).

In order to deploy to, or download reports from, this server, you will need to submit a PR to this (bocoup/image-annotator) repo adding configuration for yourself to `ansible/vars/users.yml`. Once this has been done, ask one the
project contributors can provision your account and give you the
"Vault password" needed to run the following commands:

### npm run edit-secrets
This will open the secrets file in your default editor. Secret data is managed
by Ansible Vault. All secrets are stored in [`ansible/vars/secrets.yml`]().

### npm run provision:[production|staging|vagrant]
This will prepare a target machine with all system dependencies needed to
run Image Annotator and grant collaborators access to run deployments. You
will be prompted for both a Vault password and a SUDO password during this
task. You will have configured your sudo password at the beginning of the
project when you added yourself to `ansible/vars/users.yml`.

### npm run deploy:[production|staging|vagrant] -- -e commit=master
This will clone your desired commit to the target machine, install all node
dependencies, compile the site with webpack, apply any outstanding migrations
to the database and restart the API server.

### npm run database-restore:[production|staging|vagrant]
The database residing on the production server is backed up to S3 hourly.
Running this for any target server will completely replace the database
with the most recent backup. Take care not to do this for production
unless you know what you are doing!

#### Reporting
Running the following commands from the root directory of this repository will
dump a CSV from our production database to your local machine.

### npm run download-annotations
This will export all annotation data to `annotations.csv`. You'll be prompted
for a "Vault password" when running this.

### npm run download-feedback
This will export all feedback form data to `feedback.csv`. You'll be prompted
for a "Vault password" when running this. **TODO:** implement a feedback form
in the UI. At the time of this writing we are using google forms for feedback.

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
- `npm run storybook`: launch [React Storybook](https://getstorybook.io) for component development (accessible at [localhost:6006](http://localhost:6006) by default)

### backend
The backend is running node, PostgreSQL and an express based set of middlewares for the REST API we expose. In order to develop the application, you must have an installation of PostgreSQL.

#### Setting up Postgres
There are numerous ways to run PostgreSQL. Choose the one that is most familiar
to you!

**If you have Docker on your machine, do the following:**
```
docker run --name ia-pg -d -p 5432:5432 -i postgres
docker exec -it ia-pg su postgres -c 'createdb image-annotator'
npm run migrate:up
npm start

# stop postgres
docker stop ia-pg

# start postgres
docker start ia-pg
```

**If you have VirtualBox and Vagrant on your machine, do the following:**
```
printf "PGHOST=10.10.0.100\nPGUSER=image-annotator" > .env
vagrant up
npm run provision:vagrant
npm run migrate:up
npm start

# stop postgres
vagrant halt

# start postgres
vagrant up
```

**If you want to install PostgreSQL locally on Ubuntu, do the following:**
```
sudo apt-get install postgresql
sudo service postgresql stop
sudo sh -c "printf 'local all all trust\nhost all all 127.0.0.1/32 trust\nhost all all ::1/128 trust' > /etc/postgresql/9.5/main/pg_hba.conf"
sudo service postgresql start
createdb -U postgres image-annotator
npm run migrate:up
npm start

# stop postgres
sudo service postgresql stop

# start postgres
sudo service postgresql start
```

**If you want to install PostgreSQL locally on OSX, do the following:**

Ensure you have [brew](https://brew.sh/) installed. Then, run this:

```
printf "PGUSER=$USER" > .env
brew install postgresql
brew services start postgresql
createdb image-annotator
npm run migrate:up
npm start

# stop postgres
brew services stop postgresql

# start postgres
brew services start postgresql
```

### Running the prototypes
`cd` into the prototypes directory you want to look at and run `npm start` (Requires python, equivalent to running `python -m SimpleHTTPServer 8000`) or a comparable static web server.

Navigate to the following prototypes in your browser:
* test on 25 sample landmarked images of faces [sample-data-rotate-regions](http://localhost:8000/prototypes/fabric-test/sample-data-rotate-regions.html)
* UI experiment for three annotation modes: [general fabric.js test](http://localhost:8000/prototypes/fabric-test/)

## Glossary of Terms

This section clarifies the verbiage and terms used within the application code.

### Attribute

An **attribute** is the object representing a specific type of annotation a user will apply to any given image, such as demographic attributes like "perceived ethnicity" or positional values like "the location of the right eye."

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

An **annotation** is the object representing the submitted value for a particular [`Attribute`](#attribute).

Annotation properties:

- **Name**: the name of the image attribute annotated, such as "Perceived Ethnicity".
- **Value**: the value with which the image is annotated, such as "Asian" or "Black."

Annotation objects have the shape
```json
{
    "name": "Attribute Name",
    "value": "selected-value"
}
```

### ImageAnnotation

An **image annotation** is an object associating one or more [`Annotations`](#annotation) with the specific [`Image`](#image) to which they were applied. It contains an array of annotations, and the ID of their associated image.

ImageAnnotation objects have the shape:
```json
{
    "id": 3359,
    "annotations": [{
        "name": "Attribute Name",
        "value": "selected-value"
    }, {
        "name": "Another Attribute Name",
        "value": "selected-value"
    }]
}
```

### Image

An **image** is a representation of an image to which [`Annotations`](#annotation) will be applied.

Image objects have the shape:
```json
{
    "id": 3359,
    "url": "http://www.url.com/some-image.jpg",
    "width": 250,
    "height": 250
}
```

### Workload

A **workload** is an object containing a list of [`Images`](#image) to be annotated.

Workload objects have the shape:
```json
{
    "id": 121,
    "images": [{
        "id": 3359,
        "url": "http://url.com/some-image.jpg",
        "width": 250,
        "height": 250
    }, {
        "id": 3360,
        "url": "http://url.com/other-image.jpg",
        "width": 250,
        "height": 250
    }]
}
```

### AnnotatedWorkload

An **annotated workload** is a collection of [`ImageAnnotations`](#imageannotation) submitted for a specific [`Workload`](#workload).

Annotated Workload objects have the shape
```json
{
    "workloadId": 121,
    "images": [{
        "id": 3359,
        "annotations": [{
            "name": "Attribute Name",
            "value": "selected-value"
        }, {
            "name": "Another Attribute Name",
            "value": "selected-value"
        }]
    }, {
        "id": 3360,
        "annotations": [{
            "name": "Attribute Name",
            "value": "selected-value"
        }, {
            "name": "Another Attribute Name",
            "value": "selected-value"
        }]
    }]
}
```
