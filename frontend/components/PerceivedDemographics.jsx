import React, { Component } from 'react'
import { connect } from 'react-redux';
import { requestFaces } from '../redux/actions';
import CanvasContainer from './CanvasContainer';
import CarouselContainer from './CarouselContainer';

import styles from './PerceivedDemographics.styl';


// Kick off initial data load
// store.dispatch(requestFaces());



class PerceivedDemographicsContainer extends Component {
  componentDidMount () {
    this.props.onEnter();
  }

  constructor(props) {
    super(props);
    this.state = {
      percievedAge: 0,
      pervievedGender: '',
      percievedEthnicity: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState({
      [name]: value
    });

    console.log(value);

  }

  handleSubmit(event) {
    console.log('form value: ', this.state);
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <CanvasContainer/>
        <form onSubmit={this.handleSubmit}>
          <label>
            age: (younger)
            <input
              name="percievedAge"
              type="range"
              checked={this.state.percievedAge}
              onChange={this.handleInputChange}
              min="0" max="5" />
            (older)
          </label>

          <label>
            percieved  gender:
            <select name="pervievedGender" value={this.state.pervievedGender} onChange={this.handleInputChange}>
              <option value="male">male</option>
              <option  value="female">female</option>
              <option value="genderqueer">genderqueer</option>
            </select>
          </label>

          <label>
            perceived ethnicity:
            <select name="percievedEthnicity" value={this.state.percievedEthnicity} onChange={this.handleInputChange}>
              <option value="black">black</option>
              <option value="latino">latino</option>
              <option value="white">white</option>
              <option value="asian">asian</option>
              <option value="other">other</option>
            </select>
          </label>

          <input type="submit" value="Submit" />
        </form>
        <CarouselContainer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestFaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerceivedDemographicsContainer);
