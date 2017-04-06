import React, { PropTypes, Component } from 'react';

import styles from './PerceivedDemographics.styl';

export default class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Math.floor((props.min + props.max) / 2),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();

    const { name } = this.props;
    const { value } = this.state;

    this.props.onChange({ target: { name, value: String(value) } });
  }

  render() {
    const {
      props: { min, max },
      state: { value },
    } = this;
    return (
      <div className={styles.rangeSlider}>
        <div className={styles.rangeSliderValueLabels}>
          <span className={styles.rangeSliderFirstValue}>10</span>
          <span className={styles.rangeSliderMiddleValue}>55</span>
          <span className={styles.rangeSliderLastValue}>100</span>
        </div>
        <div className={styles.rangeSliderLines} />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={this.handleInputChange}
        />
        <div className={styles.rangeSliderValue}>
          <span className={styles.rangeSliderValueBold}>{value}</span> years old
        </div>
        <button className={styles.nextButton} onClick={this.handleClick}>Next</button>
      </div>
    );
  }
}

RangeSlider.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
