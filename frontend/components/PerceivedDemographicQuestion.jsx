import React, { PropTypes } from 'react';

import strToId from '../utils/str-to-id';

import styles from './PerceivedDemographics.styl';

// ESLint didn't detect all props as being used without this destructuring...
const PerceivedDemographicQuestion = ({
  className,
  visible,
  name,
  options,
  onChange,
  selected,
}) => (
  <fieldset
    className={`${className} ${styles.fieldset}`}
    style={{
      display: visible ? 'block' : 'none',
    }}
  >
    <legend>{name}</legend>
    {options.map((option) => {
      const optionKey = `${strToId(name)}_${strToId(option)}`;
      return (
        <label
          key={optionKey}
          className={styles.radioButton}
          htmlFor={optionKey}
        >
          <input
            id={optionKey}
            type="radio"
            name={name}
            value={option}
            onChange={onChange}
            checked={option === selected}
            required
          />
          {option}
        </label>
      );
    })}
  </fieldset>
);

PerceivedDemographicQuestion.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

PerceivedDemographicQuestion.defaultProps = {
  className: '',
};

export default PerceivedDemographicQuestion;
