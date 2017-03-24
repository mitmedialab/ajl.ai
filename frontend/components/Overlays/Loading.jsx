import React from 'react';

import styles from './Loading.styl';

import Overlay from './Overlay';

export default () => (
  <Overlay>
    <div className={styles.loader}>Loading&hellip;</div>
  </Overlay>
);
