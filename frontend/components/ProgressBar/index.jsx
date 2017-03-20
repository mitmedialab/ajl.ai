import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './ProgressBar.styl';

const ProgressBar = ({
  className,
  incrementName,
  current,
  total,
}) => {
  const complete = current - 1;
  const widthPct = (100 / total) * complete;
  return (
    <div className={classNames(className, styles.barContainer)}>
      <span className={styles.label}>
        {incrementName} {current} of {total}
      </span>
      <div
        className={classNames(styles.bar, {
          // Add a class to apply smooth transitions after the first step
          [styles.inProgress]: complete > 0,
        })}
        style={{
          width: `${widthPct}%`,
        }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  // e.g. "Step" or "Image"
  incrementName: PropTypes.string.isRequired,
  // "current" starts at 1
  current: PropTypes.number.isRequired,
  // Total item count
  total: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  className: '',
};

export default ProgressBar;
