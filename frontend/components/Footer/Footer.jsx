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
    <p>
      Brought to you by <a href="https://civic.mit.edu">MIT Civic Media</a> and <a href="http://bocoup.com/about">Bocoup</a>. Source code for this tool is <a href="https://github.com/bocoup/image-annotator">available on github</a>.

    </p>


  </footer>
);

Footer.propTypes = {
  onClickFAQ: PropTypes.func.isRequired,
};

export default Footer;
