import React, { PropTypes } from 'react';
import Modal from './Modal';

import styles from './FeedbackModal.styl';

const FeedbackModal = ({ onCloseFeedback }) => (
  <Modal
    onConfirm={onCloseFeedback}
    confirmText="Close"
  >
    <a className={styles.button} href="#some-form">Submit Feedback</a>
    <p>
      AJL needs your help to tag images with demographic information. Your
      tags will help us assess the diversity of data sets used to train and
      test facial analysis algorithms. We acknowledge that specific demographic
      categorizations are imprecise and reductive. We choose to gather
      perceptions of identity because the social constructs of ethnicity and
      gender have real-world impact.
    </p>
    <p>
      Our goal in gathering these tags is ultimately to create systems that
      work well for everybody and do not disproportionately harm a specific
      group. We welcome your feedback on additional labels to include or
      alternative ways to assess the diversity of these data sets.
    </p>
  </Modal>
);

FeedbackModal.propTypes = {
  onCloseFeedback: PropTypes.func.isRequired,
};

export default FeedbackModal;
