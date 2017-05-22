import React, { PropTypes, Component } from 'react';

import styles from './PerceivedDemographics.styl';

export default class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.min,
      userHasInteracted: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      value: event.target.value,
      userHasInteracted: true,
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { name } = this.props;
    const { value } = this.state;

    this.props.onChange({ target: { name, value: String(value) } });
    this.setState({
      value: this.props.min,
      userHasInteracted: false,
    });
  }

  render() {
    const {
      props: { min, max },
      state: { value },
    } = this;

    let rangeValue = '';

    if (this.state.userHasInteracted) {
      rangeValue = (
        <div>
          <span className={styles.rangeSliderValueBold}>{value}</span> years old
        </div>
      );
    }


    return (
      <div className={styles.rangeSlider}>
        <div className={styles.rangeSliderValue}>
          {rangeValue}
        </div>
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
          step="5"
          onChange={this.handleInputChange}
        />

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
