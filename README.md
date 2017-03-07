# Image Annotator

## Repository Structure

- `image-annotator/` - front-end client written in React
- `prototypes/` - exploratory interaction prototypes
    + `fabric-test/` - prototypes using [fabric.js](http://fabricjs.com/) for rendering
    + `paper-test/` - prototype using [Paper.js](http://paperjs.org) for rendering
    + `snap-svg-test/` - prototype using SVG to render landmarks

## Installation

### Prototypes

`cd` into the root of the project and run `npm start` (Requires python, equivalent to running `python -m SimpleHTTPServer 8000`) or a comparable static web server.

Navigate to the following prototypes in your browser:

* test on 25 sample landmarked images of faces [sample-data-rotate-regions](http://localhost:8000/prototypes/fabric-test/sample-data-rotate-regions.html)
* UI experiment for three annotation modes: [general fabric.js test](http://localhost:8000/prototypes/fabric-test/)

### React front-end

Run `npm install` to install front-end dependencies; then run `npm start` to launch the webpack dev server. The application will then be available at [localhost:8080](http://localhost:8080).

#### Other commands

These commands are available after installation within the `image-annotator/` directory:

- `npm test`: run unit tests with Jest, then lint on exit
- `npm run lint`: run ESLint to identify syntax & style issues in the code
- `npm run build`: generate a static build into `image-annotator/dist`

### Instructions for Ubuntu 16 dev environment setup:

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


### Instructions for Mac OS dev environment setup:

_The postgres installation step assumes you are using the [Homebrew](https://brew.sh/) package manager_

$ brew install postgresql

$ brew services start postgresql

$ createdb image-annotator

_(on subsequent runs PostgreSQL should now auto-start)_

$ npm run migrate:up
