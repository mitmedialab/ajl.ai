import React, { PropTypes } from 'react';

import styles from './KnownOverallProgress.styl';

const LOADING_IMAGES = '...';
const LOADING_ANNOTATED = '...';

const KnownOverallProgress = ({
  annotated,
  images,
  loadOverallStats,
}) => {
  const hasImages = images > -1;
  const hasAnnontated = annotated > -1;
  if (hasAnnontated === false) {
    loadOverallStats();
  }
  let progress = 0;
  if (hasAnnontated && hasImages) {
    progress = annotated / images;
  }
  return (<div>
    <p>
      We currently have {hasImages ? images : LOADING_IMAGES} images with data
      on {hasAnnontated ? annotated : LOADING_ANNOTATED} of them.
    </p>
    <progress className={styles.progress} value={progress} min="0" max="100" />
  </div>);
};

KnownOverallProgress.propTypes = {
  annotated: PropTypes.number,
  images: PropTypes.number,
  loadOverallStats: PropTypes.func.isRequired,
};

KnownOverallProgress.defaultProps = {
  annotated: undefined,
  images: undefined,
};

export default KnownOverallProgress;
