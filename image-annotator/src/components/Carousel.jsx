import React, { PropTypes } from 'react';

import styles from './Carousel.styl';

const Carousel = props => (
  <div className={styles.carousel}>
    <button
      className={styles.prev}
      type="button"
      rel="prev"
      onClick={props.onClickPrevious}
    >Previous</button>
    <span className={styles.current}>
      Face {props.current} of {props.total}
    </span>
    <button
      className={styles.next}
      type="button"
      rel="prev"
      onClick={props.onClickNext}
    >Previous</button>
  </div>
);

Carousel.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClickPrevious: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default Carousel;
