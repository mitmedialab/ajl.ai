import React from 'react';
import { Link } from 'react-router-dom';

import KnownOverallProgressContainer from './KnownOverallProgressContainer';

import styles from './Home.styl';

export default () => (
  <div className={styles.wrapper}>
    <div className={styles.mainContainer}>
      <div className={styles.hompageContainer}>
        <div className={styles.homeSubHeader}>
          <h1>Facial Data Transparency Project</h1>
          <h5>
            From the <a href="http://ajlunited.org">
              Algorithmic Justice League
            </a>
          </h5>
        </div>
        <section className={styles.homepageProgressBar}>
          <p>
            Help us check for bias by tagging pictures of celebrities with demographic labels.
          </p>
          <KnownOverallProgressContainer />
          <Link className={styles.homepageButton} to="annotate">Start Tagging</Link>
        </section>
      </div>
    </div>
  </div>
);
