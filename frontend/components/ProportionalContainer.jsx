import React, { PropTypes } from 'react';

import styles from './ProportionalContainer.styl';

function computeMaxHeight(maxWidth, widthHeightRatio) {
  // Pull out the suffix,
  const suffix = maxWidth.trim().replace(/^\d+(\.\d*)?/, '');
  // And pull out the numeric value
  const maxWidthValue = +(maxWidth.trim().replace(/[^\d]*$/, ''));
  // Calculate and return a proportional height using the same units
  return `${maxWidthValue / widthHeightRatio}${suffix}`;
}

const ProportionalContainer = ({
  children,
  maxWidth,
  widthHeightRatio,
}) => (
  <div style={{ maxWidth }}>
    <div
      className={styles.container}
      style={{
        paddingBottom: `${100 / widthHeightRatio}%`,
      }}
    >
      {children}
    </div>
  </div>
);

console.log(computeMaxHeight('500px', 4 / 3));

ProportionalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  widthHeightRatio: PropTypes.number.isRequired,
};

ProportionalContainer.defaultProps = {
  maxWidth: '100%',
};

export default ProportionalContainer;
