import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as propShapes from '../prop-shapes';
import Landmarks from './Landmarks';
import { selectedFace } from '../redux/selectors';
import { requestFaces } from '../redux/actions';

class LandmarksContainer extends PureComponent {
  componentDidMount() {
    this.props.onEnter();
  }

  render() {
    const { face } = this.props;
    return (
      <Landmarks face={face} />
    );
  }
}

LandmarksContainer.propTypes = {
  face: propShapes.face,
  onEnter: PropTypes.func.isRequired,
};

LandmarksContainer.defaultProps = {
  face: null,
};

const mapStateToProps = state => ({
  face: selectedFace(state),
});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestFaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandmarksContainer);
