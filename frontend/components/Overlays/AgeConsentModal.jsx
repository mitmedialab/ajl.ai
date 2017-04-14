import React, { PropTypes } from 'react';
import Modal from './Modal';

const AgeConsentModal = ({ onConfirmAgeConsent, onRejectAgeConsent }) => (
  <Modal
    onConfirm={onConfirmAgeConsent}
    confirmText="I Agree"
    onCancel={onRejectAgeConsent}
    cancelText="I Disagree"
  >
    <h1>Consent Form</h1>
    <p>
      AJL.AI is part of an ongoing MIT scientific research project. Your decision to participate in annotating images is voluntary. We do not collect personally identifiable data with your annotations. The data we will have, in addition to your responses, is the time at which you completed annotating an image.
    </p>
    <p>
      The results of the research may be presented at scientific meetings or published in scientific journals. Selecting the 'I Agree' button indicates that you are at least 18 years of age and agree to annotate voluntarily.
    </p>
  </Modal>
);

AgeConsentModal.propTypes = {
  onConfirmAgeConsent: PropTypes.func.isRequired,
  onRejectAgeConsent: PropTypes.func.isRequired,
};

export default AgeConsentModal;
