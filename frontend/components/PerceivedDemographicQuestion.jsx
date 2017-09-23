import React, { PropTypes } from 'react';
import classNames from 'classnames';

import strToId from '../utils/str-to-id';

import RadioButtonOption from './RadioButtonOption';
import RangeSlider from './RangeSlider';

import styles from './PerceivedDemographics.styl';
import radioStyles from './RadioButtonOption.styl';

// ESLint didn't detect all props as being used without this destructuring...
const PerceivedDemographicQuestion = ({
  className,
  name,
  annotationType,
  options,
  onChange,
  selected,
  children,
}) => {
  let field = 'Unknown Attribute Type Error';
  if (annotationType === 'select-one') {
    field = options.map((option) => {
      const optionKey = `${strToId(name)}_${strToId(option)}`;
      return (
        <RadioButtonOption
          key={optionKey}
          id={optionKey}
          name={name}
          value={option}
          checked={option === selected}
          onChange={onChange}
          required
        />
      );
    });
  } else if (annotationType === 'range') {
    field = (
      <RangeSlider
        min={Math.min(...options.map(Number))}
        max={Math.max(...options.map(Number))}
        name={name}
        onChange={onChange}
      />
    );
  }
  return (
    <fieldset className={classNames(className, styles.fieldset)}>
      {children}
      <div className={radioStyles.flexContainer}>
        {field}
      </div>
    </fieldset>
  );
};

PerceivedDemographicQuestion.propTypes = {
  className: PropTypes.string,
  annotationType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

PerceivedDemographicQuestion.defaultProps = {
  className: '',
  selected: '',
};

export default PerceivedDemographicQuestion;
