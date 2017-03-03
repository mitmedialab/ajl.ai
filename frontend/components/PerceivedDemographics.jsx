import React, { Component } from 'react'
import { connect } from 'react-redux';
import { requestFaces } from '../redux/actions';
import CanvasContainer from './CanvasContainer';
import CarouselContainer from './CarouselContainer';


// Kick off initial data load
// store.dispatch(requestFaces());



class PerceivedDemographicsContainer extends Component {
  componentDidMount () {
    this.props.onEnter();
  }

  render () {
    return (
      <div>
        <CanvasContainer/>
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
