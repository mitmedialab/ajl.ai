import React from 'react';
import { connect } from 'react-redux';

import { selectedFace } from '../redux/selectors';

import * as propShapes from '../prop-shapes';

import Canvas from '../components/Canvas';

const CanvasContainer = ({ face }) => (
  <Canvas face={face} />
);

CanvasContainer.propTypes = {
  face: propShapes.face,
};

CanvasContainer.defaultProps = {
  face: null,
};

const mapStateToProps = state => ({
  face: selectedFace(state),
});

export default connect(mapStateToProps)(CanvasContainer);
