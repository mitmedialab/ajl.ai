import React, { PropTypes } from 'react';

import styles from './RadioButtonOption.styl';

const RadioButtonOption = ({
  id,
  name,
  value,
  checked,
  required,
  onChange,
}) => (
  <label
    className={styles.radioButton}
    htmlFor={id}
  >
    <input
      className={styles.hidden}
      id={id}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      required={required}
    />
    {value}
  </label>
);

RadioButtonOption.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

RadioButtonOption.defaultProps = {
  selected: '',
  required: false,
};

export default RadioButtonOption;
