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

`cd` into the `image-annotator` directory and run `npm install` to install front-end dependencies; then run `npm start` to launch the webpack dev server. The application will then be available at [localhost:8080](http://localhost:8080).

The application currently expects [AJL-U/openfaces](https://github.com/AJL-U/openfaces) to be running in parallel, on port 8181: images are loaded from this repository.

#### Other commands

These commands are available after installation within the `image-annotator/` directory:

- `npm test`: run unit tests with Jest
- `npm run lint`: run ESLint to identify syntax & style issues in the code
- `npm run build`: generate a static build into `image-annotator/dist`
