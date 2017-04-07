import React, { PropTypes } from 'react';

import styles from './Footer.styl';

const Footer = ({ onClickFAQ }) => (
  <footer>
    <button
      className={styles.feedback}
      type="button"
      onClick={onClickFAQ}
    >
      More information
    </button>
  </footer>
);

Footer.propTypes = {
  onClickFAQ: PropTypes.func.isRequired,
};

export default Footer;
