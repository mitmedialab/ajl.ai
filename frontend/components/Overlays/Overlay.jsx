import React, { PropTypes } from 'react';

import '../App.styl';

import styles from './Overlay.styl';

const Overlay = ({ children }) => (
  <div className={styles.overlay}>
    {children}
  </div>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Overlay;
