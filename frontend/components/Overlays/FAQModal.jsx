import React, { PropTypes } from 'react';
import Modal from './Modal';
import styles from './Modal.styl';
import OverviewAnimation from '../shared/img/overview.gif';


const FAQModal = ({ onCloseFAQ }) => (
  <Modal
    onConfirm={onCloseFAQ}
    confirmText="Continue"
  >

    <h4>Instructions</h4>
    <p>
        Determine the quality of each image and then add age, gender, and ethnicity labels.
        See <a href="/about">more details</a>.
    </p>

    <div className={styles.center} >
      <img src={OverviewAnimation} width="200px" alt="Animation of tagging process" />
    </div>
  </Modal>
);

FAQModal.propTypes = {
  onCloseFAQ: PropTypes.func.isRequired,
};

export default FAQModal;
