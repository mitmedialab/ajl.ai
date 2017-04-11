import React, { PropTypes } from 'react';
import Modal from './Modal';

const AgeConsentModal = ({ onConfirmAgeConsent, onRejectAgeConsent }) => (
  <Modal
    onConfirm={onConfirmAgeConsent}
    confirmText="I am 18 or Over"
    onCancel={onRejectAgeConsent}
    cancelText="No"
  >
    <h1>Are you over the age of 18?</h1>
  </Modal>
);

AgeConsentModal.propTypes = {
  onConfirmAgeConsent: PropTypes.func.isRequired,
  onRejectAgeConsent: PropTypes.func.isRequired,
};

export default AgeConsentModal;
