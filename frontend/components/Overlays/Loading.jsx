import React, { PropTypes } from 'react';

import styles from './Loading.styl';

import Overlay from './Overlay';

const LoadingOverlay = ({ isLoading }) => (isLoading ? (
  <Overlay>
    <div className={styles.loader}>Loading&hellip;</div>
  </Overlay>
) : null);

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingOverlay;
