import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  isLoading,
  appErrors,
  makeFAQModalVisible,
  makeAgeConsentModalVisible,
  completedWorkloadCount,
} from '../redux/selectors';
import { hideFAQModal, hideAgeConsentModal, showFAQModal } from '../redux/actions';
import { errorProps } from '../services/content';

import LoadingIndicator from './Overlays/Loading';
import Modal from './Overlays/Modal';
import FAQModal from './Overlays/FAQModal';
import AgeConsentModal from './Overlays/AgeConsentModal';

const getErrorProps = (errors) => {
  if (! errors.length) {
    return {};
  }

  // In the event of multiple errors, render only the first one
  const err = errors[0];

  return {
    ...errorProps(err.type),
    errorMessage: err.error && err.error.message,
    retryAction: err.retryAction,
  };
};

const ModalContainer = (props) => {
  const {
    errorTitle,
    errorMessage,
    retryAction,
    cancelAction,
    ...errorModalProps
  } = getErrorProps(props.errors);
  const onCancelError = cancelAction ? () => props.dispatch(cancelAction) : null;
  return (
    <div>
      {/* Render Loading overlay, if applicable */}
      {props.isLoading ? <LoadingIndicator /> : null}

      {/* Render API Error overlay, if applicable */}
      {props.errors.length ? (
        <Modal
          {...errorModalProps}
          onCancel={onCancelError}
          onConfirm={() => props.dispatch(retryAction)}
        >
          <h2>{errorTitle}</h2>
          {errorMessage ? (<p>{errorMessage}</p>) : null}
        </Modal>
      ) : null}

      {/* Render FAQ modal if applicable */}

      {props.FAQModalVisible ? (
        <FAQModal onCloseFAQ={props.onCloseFAQ} />
      ) : null}

      {/* Render Age Consent modal if applicable */}
      {props.AgeConsentModalVisible && props.completeCount < 1 ? (
        <AgeConsentModal
          onConfirmAgeConsent={props.onConfirmAgeConsent}
          onRejectAgeConsent={props.onRejectAgeConsent}
        />
      ) : null}
    </div>
  );
};


ModalContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    error: PropTypes.instanceOf(Error).isRequired,
    retryAction: PropTypes.shape({
      type: PropTypes.string.isRequired,
      payload: PropTypes.any,
    }),
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCloseFAQ: PropTypes.func.isRequired,
  onConfirmAgeConsent: PropTypes.func.isRequired,
  onRejectAgeConsent: PropTypes.func.isRequired,
  FAQModalVisible: PropTypes.bool.isRequired,
  AgeConsentModalVisible: PropTypes.bool.isRequired,
  completeCount: PropTypes.number.isRequired,

};

const mapStateToProps = state => ({
  errors: appErrors(state),
  isLoading: isLoading(state),
  FAQModalVisible: makeFAQModalVisible(state),
  AgeConsentModalVisible: makeAgeConsentModalVisible(state),
  completeCount: completedWorkloadCount(state),
});

const mapDispatchToProps = dispatch => ({
  onCloseFAQ: () => dispatch(hideFAQModal()),
  onConfirmAgeConsent: () => {
    dispatch(hideAgeConsentModal());
    dispatch(showFAQModal());
  },
  onRejectAgeConsent: () => {
    dispatch(hideAgeConsentModal());
    window.location = '/';
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
