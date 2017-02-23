import React from 'react';
import { connect } from 'react-redux';

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
  face: state.faces.selected,
});

export default connect(mapStateToProps)(CanvasContainer);
