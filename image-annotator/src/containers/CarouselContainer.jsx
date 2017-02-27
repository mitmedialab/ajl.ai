import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  previousFace,
  nextFace,
} from '../redux/actions';

import {
  selectedFaceIndex,
  totalFaceCount,
} from '../redux/selectors';

import Carousel from '../components/Carousel';

const CarouselContainer = props => (
  <Carousel
    current={props.current}
    total={props.total}
    onClickPrevious={props.onClickPrevious}
    onClickNext={props.onClickNext}
  />
);

CarouselContainer.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  onClickPrevious: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

CarouselContainer.defaultProps = {
  current: 0,
  total: 0,
};

const mapStateToProps = state => ({
  current: selectedFaceIndex(state),
  total: totalFaceCount(state),
});

const mapDispatchToProps = dispatch => ({
  onClickPrevious: () => dispatch(previousFace()),
  onClickNext: () => dispatch(nextFace()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselContainer);
