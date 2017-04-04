import React from 'react';
// import { Link } from 'react-router-dom';

import KnownOverallProgressContainer from './KnownOverallProgressContainer';

import styles from './Home.styl';

export default () => (
  <div className={styles.wrapper}>
    <div className={styles.mainContainer}>
      <div className={styles.hompageContainer}>
        <div className={styles.homeSubHeader}>
          <h1>The Computer Vision Benchmarking Project</h1>
          <h5>From the Algorithmic Justice League</h5>
        </div>
        <section>
          <h2>Make a Difference</h2>
          <p>
            Algorithms are trained and tested with data sets.
            A lack of diversity in these data sets can lead
            to biased systems. Help us check for bias by tagging
            influential data sets.
          </p>
        </section>
        <section>
          <h2>Simple Actions Matter</h2>
          <p>
            The simple action of tagging face images with perceived
            age, gender, and ethnicity will generate bias busting
            information that will inform the creation of inclusive technology.
          </p>
        </section>
        <section>
          <h2>Be Heard</h2>
          <p>
            As algorithms increasingly influence more aspects of our lives,
            we need ways to keep coded systems accountable. Please be in
            touch with questions, comments, concerns, and experiences relating
            to algorithmic bias.
          </p>
          <button className={styles.homepageContactUs}>Contact Us</button>
        </section>
        <section className={styles.homepageProgressBar}>
          <KnownOverallProgressContainer />
        </section>
      </div>
    </div>
  </div>
);
