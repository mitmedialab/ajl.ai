import React, { PropTypes, Component } from 'react';

export default class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Math.floor((props.min+props.max) / 2),
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

    this.props.onChange({ target: { name, value: String(value) }})
  }

  render() {
    const {
      props: {min, max},
      state: {value},
    } = this;
    return (
      <div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={this.handleInputChange}
        />
        {value}
        <button onClick={this.handleClick}>Next</button>
      </div>
    )
  }
}

RangeSlider.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
