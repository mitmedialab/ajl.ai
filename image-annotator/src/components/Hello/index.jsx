import React from 'react';

import styles from './Hello.styl';

const Hello = ({ addressee }) => (
  <h2 className={styles.hello}>
    Hello, {addressee}
  </h2>
);

Hello.propTypes = {
  addressee: React.PropTypes.string.isRequired,
};

export default Hello;
