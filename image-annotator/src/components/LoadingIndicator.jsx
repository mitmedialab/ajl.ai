import React, { PropTypes } from 'react';

import styles from './LoadingIndicator.styl';

const LoadingIndicator = ({ isLoading }) => isLoading ? (
  <div className={styles['loading-modal']}>
    <h2 className={styles['loading-message']}>
      Loading&hellip;
    </h2>
  </div>
) : null;

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingIndicator;
