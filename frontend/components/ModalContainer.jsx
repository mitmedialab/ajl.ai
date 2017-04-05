import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { isLoading, appErrors, showFeedbackModal } from '../redux/selectors';
import { hideFeedbackModal } from '../redux/actions';
import { errorProps } from '../services/content';

import LoadingIndicator from './Overlays/Loading';
import Modal from './Overlays/Modal';
import FeedbackModal from './Overlays/FeedbackModal';

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

      {/* Render Feedback modal if applicable */}

      {props.feedbackModalVisible ? (
        <FeedbackModal onCloseFeedback={props.onCloseFeedback} />
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
  onCloseFeedback: PropTypes.func.isRequired,
  feedbackModalVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  errors: appErrors(state),
  isLoading: isLoading(state),
  feedbackModalVisible: showFeedbackModal(state),
});

const mapDispatchToProps = dispatch => ({
  onCloseFeedback: () => dispatch(hideFeedbackModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
