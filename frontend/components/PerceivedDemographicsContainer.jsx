import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestFaces } from '../redux/actions';
import CanvasContainer from './CanvasContainer';
import { selectedFace } from '../redux/selectors';

import PerceivedDemographics from './PerceivedDemographics';

const mapStateToProps = state => ({
  face: selectedFace(state),
});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestFaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerceivedDemographics);
