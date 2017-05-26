
import React from 'react';
import { Link } from 'react-router-dom';

import KnownOverallProgressContainer from './KnownOverallProgressContainer';

import styles from './Home.styl';

// import CodedGazeImg from './shared/img/CodedGazeLONG.svg';

// import DestinyGif from './shared/img/DestinyGif.gif';

// import FaceImg from './shared/img/FacetheGaze.svg';


export default () => (
  <div className={styles.wrapper}>
    <div className={styles.mainContainer}>
      <div className={styles.hompageContainer}>
        <div className={styles.homeSubHeader}>
          <ul className={styles.homeIntro}>
            <li>
              From the <a href="http://ajlunited.org">
                Algorithmic Justice League
              </a>
            </li>
            <li>
              <h1>Fight Bias</h1>
            </li>
            <li>
              Help us check for bias by tagging pictures of celebrities with demographic labels.
            </li>
            <li>
              <Link className={styles.homepageButton} to="annotate">Start Tagging</Link>
            </li>
          </ul>
        </div>
      </div>
      <section className={styles.homepageProgressBar}>
        <KnownOverallProgressContainer />
      </section>
    </div>
  </div>
);
