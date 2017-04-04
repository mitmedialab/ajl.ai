import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.styl';

export default () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/annotate">Annotate</Link>
    </nav>
  </header>
);
