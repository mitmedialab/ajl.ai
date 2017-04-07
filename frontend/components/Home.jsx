import React from 'react';
// import { Link } from 'react-router-dom';

import KnownOverallProgressContainer from './KnownOverallProgressContainer';

import styles from './Home.styl';

export default () => (
  <div className={styles.wrapper}>
    <div className={styles.mainContainer}>
      <div className={styles.hompageContainer}>
        <div className={styles.homeSubHeader}>
          <h1>Destiny Unveiled: Facial Data Transparency Project</h1>
          <h5>
            From the <a href="http://ajlunited.org">
              Algorithmic Justice League
            </a>
          </h5>
        </div>
        <section className={styles.homepageProgressBar}>
          <b>
            If data is destiny, how inclusive is our future data-centric
            technology?
          </b> How representative are the datasets being used to train machines
          to analyze faces? Help us find out by tagging training images.
          <KnownOverallProgressContainer />
          <a className={styles.homepageButton} href="annotate">Start Tagging</a>
        </section>
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
            we need ways to keep coded systems accountable.
            Please <a className={styles.homepageContactUs} href="https://goo.gl/forms/jBwH8fuMqZwLf6Mr2">be in touch</a> with
            questions, comments, concerns, and experiences relating
            to algorithmic bias.
          </p>
        </section>
      </div>
    </div>
  </div>
);
