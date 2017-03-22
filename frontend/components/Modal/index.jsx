import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './Modal.styl';

const Modal = props => (
  <div className={styles.modalWrapper}>
    <div className={styles.modal}>
      {props.children}

      {typeof props.onCancel === 'function' ? (
        <button
          type="button"
          onClick={props.onCancel}
          className={classNames(styles.button, styles.cancel)}
        >{props.cancelText}</button>
      ) : null}
      <button
        type="button"
        onClick={props.onConfirm}
        className={classNames(styles.button, styles.confirm)}
      >{props.confirmText}</button>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  confirmText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
};

Modal.defaultProps = {
  cancelText: '',
  onCancel: null,
};

export default Modal;
