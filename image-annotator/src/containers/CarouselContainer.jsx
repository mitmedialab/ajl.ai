import React from 'react';
import { connect } from 'react-redux';

import * as propShapes from '../prop-shapes';

const Carousel = ({ faces }) => (
  <p>{faces.length} faces</p>
);

Carousel.propTypes = {
  faces: propShapes.faces.isRequired,
};

const mapStateToProps = state => ({
  faces: state.faces.list,
});

export default connect(mapStateToProps)(Carousel);
