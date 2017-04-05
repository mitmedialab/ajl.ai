import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.styl';

const Header = ({ onClickFeedback }) => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/annotate">Annotate</Link>

      <button
        className={styles.feedback}
        type="button"
        onClick={onClickFeedback}
      >
        Feedback
      </button>
    </nav>
  </header>
);

Header.propTypes = {
  onClickFeedback: PropTypes.func.isRequired,
};

export default Header;
