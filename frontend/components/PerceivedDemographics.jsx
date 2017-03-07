import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestFaces } from '../redux/actions';
import CanvasContainer from './CanvasContainer';
import CarouselContainer from './CarouselContainer';
import * as propShapes from '../prop-shapes';

// import styles from './PerceivedDemographics.styl';

class PerceivedDemographics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      perceivedAge: 0,
      perceivedGender: '',
      perceivedEthnicity: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onEnter();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    // eslint-disable-next-line no-console
    console.log(value);
  }

  handleSubmit(event) {
    // eslint-disable-next-line no-console
    console.log('form value: ', this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <CanvasContainer />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="perceivedAge">
            age: (younger)
            <input
              id="perceivedAge"
              name="perceivedAge"
              type="range"
              checked={this.state.perceivedAge}
              onChange={this.handleInputChange}
              min="0" max="5"
            />
            (older)
          </label>

          <label htmlFor="perceivedGender">
            percieved gender:
            <select
              id="perceivedGender"
              name="perceivedGender"
              value={this.state.perceivedGender}
              onChange={this.handleInputChange}
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="genderqueer">genderqueer</option>
            </select>
          </label>

          <label htmlFor="perceivedEthnicity">
            perceived ethnicity:
            <select
              id="perceivedEthnicity"
              name="perceivedEthnicity"
              value={this.state.perceivedEthnicity}
              onChange={this.handleInputChange}
            >
              <option value="black">black</option>
              <option value="latino">latino</option>
              <option value="white">white</option>
              <option value="asian">asian</option>
              <option value="other">other</option>
            </select>
          </label>

          <button type="submit">Submit</button>
        </form>
        <CarouselContainer />
      </div>
    );
  }
}

PerceivedDemographics.propTypes = {
  onEnter: PropTypes.func.isRequired,
  face: propShapes.face,
};

CanvasContainer.defaultProps = {
  face: null,
};

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestFaces()),
});

export default PerceivedDemographics;
