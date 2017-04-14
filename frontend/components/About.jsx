import React from 'react';

import styles from './Home.styl';

export default () => (
  <div className={styles.wrapper}>
    <div className={styles.mainContainer}>
      <div className={styles.hompageContainer}>
        <div className={styles.homeSubHeader}>
          <h1>About The Image Annotator</h1>
          <h5>
            From the <a href="http://ajlunited.org">
              Algorithmic Justice League
            </a>
          </h5>
        </div>
        <section>
          <h2>Project Overview</h2>
          <p>
            We're collecting demographic data on <a href="https://data.vision.ee.ethz.ch/cvl/rrothe/imdb-wiki/">IMDB-Wiki</a>, the popular academic computer vision data set comprised of images of 20,000+ unique persons from IMDB and Wikipedia in order to be able to describe the data biases present in IMDB-Wiki.
          </p>
          <p>
            We're annotating this data set first becuase of it's common use in academic computer vision research. We believe that by describing the demographics present in this data set that we'll be able to say something meaningful about the bias that is being encoded into the computer vision research cannon.
          </p>
          <p>
            Once we've completely annotated these images, we'll curate a diverse subset of the images to use as a benchmark for measuring the biased expressed in fail ratess by algorithms trained on IMDB-Wiki, and similar data sets. Following that work, we're aiming to begin collecting new face data, phenotypes and self-reported identity attributes from citizens to explore developing full-spectrum, inclusion rubrics.
          </p>
          <p>
            We'll be publishing our data here once this effort is complete, along side our tools and learnings for the research commmunity and industry to use. The software we've developed for managing image annotations is already open source and available <a href="https://github.com/bocoup/image-annotator">github.com/bocoup/image-annotator</a>.
          </p>
        </section>
        <section>
          <h2>Who we are</h2>
          <figure>
            <header>
              <img alt="Joy Buolamwini" src="data:image/jpeg;base64,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" />
              <h4>Joy Buolamwini</h4>
              <h5>MIT Civic Media</h5>
            </header>
          </figure>
          <figure>
            <header>
              <img alt="Boaz Sender" src="https://www.gravatar.com/avatar/d2b5c5d8c50bb80553621e1a59f02aef?s=180&d=//static.bocoup.com/assets/img/no-avatar.png" />
              <h4>Boaz Sender</h4>
              <h5>Bocoup Research</h5>
            </header>
          </figure>
          <figure>
            <header>
              <img alt="Corey Frang" src="https://www.gravatar.com/avatar/c0551884b8ba74a364a5ac09c3f0c9d2?s=180&d=//static.bocoup.com/assets/img/no-avatar.png" />
              <h4>Corey Frang</h4>
              <h5>Bocoup</h5>
            </header>
          </figure>
          <figure>
            <header>
              <img alt="Isaac Durazo" src="https://www.gravatar.com/avatar/e44bb0d044e511cc884642650eba2475?s=180&d=//static.bocoup.com/assets/img/no-avatar.png" />
              <h4>Isaac Durazo</h4>
              <h5>Bocoup</h5>
            </header>
          </figure>
          <figure>
            <header>
              <img alt="K. Adam White" src="https://www.gravatar.com/avatar/fd0bbb7654f8340e5bb4bb2ec6d3bc5e?s=180&d=//static.bocoup.com/assets/img/no-avatar.png" />
              <h4>K. Adam White</h4>
              <h5>Bocoup</h5>
            </header>
          </figure>
        </section>
      </div>
    </div>
  </div>
);
