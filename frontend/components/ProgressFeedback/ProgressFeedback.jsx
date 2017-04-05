import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { onFirstImage, completedWorkloadCount } from '../../redux/selectors';
import { workloadFeedback } from '../../services/content';

import styles from './ProgressFeedback.styl';

const ProgressFeedback = ({ message, show }) => {
  if (! show || ! message) {
    return null;
  }
  if (message.cta) {
    return (
      <section className={styles.uxFeedback}>
        <p>
          {message.text}
        </p>
        <a className={styles.feedbackButton} href="https://goo.gl/forms/jBwH8fuMqZwLf6Mr2">Submit Feedback</a>
      </section>
    );

  }
  return (
    <section className={styles.uxFeedback}>
      <p>{message.text}</p>
    </section>
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
