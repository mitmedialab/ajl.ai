import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { onFirstImage, completedWorkloadCount } from '../../redux/selectors';
import { workloadFeedback } from '../../services/content';

import styles from './ProgressFeedback.styl';

const ProgressFeedback = ({ message, show }) => {
  if (! show || ! message) {
    return null;
  }
  return (
    <p className={styles.uxFeedback}>
      {message}
    </p>
  );
};

ProgressFeedback.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, props) => ({
  message: workloadFeedback(completedWorkloadCount(state)),
  show: Boolean(props.show && onFirstImage(state)),
});

export default connect(mapStateToProps)(ProgressFeedback);
