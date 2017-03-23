import React, { PropTypes } from 'react';

import styles from './ProportionalContainer.styl';

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

ProportionalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  widthHeightRatio: PropTypes.number.isRequired,
};

ProportionalContainer.defaultProps = {
  maxWidth: '100%',
};

export default ProportionalContainer;
