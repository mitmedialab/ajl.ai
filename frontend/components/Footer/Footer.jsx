import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.styl';

const Footer = ({ onClickFAQ }) => (
  <footer>
    <button
      className={styles.feedback}
      type="button"
      onClick={onClickFAQ}
    >
      FAQ
    </button>

    <Link className={styles.button} to="/about">About</Link>

    <p>
      built with &lt;3 by <a href="http://bocoup.org">Bocoup Research</a> and the <a href="http://ajlunited.org">Algorithmic Justice League</a>.
    </p>
  </footer>
);

Footer.propTypes = {
  onClickFAQ: PropTypes.func.isRequired,
};

export default Footer;
