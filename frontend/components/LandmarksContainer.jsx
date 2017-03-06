import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import fabric from '../services/fabric';
import * as propShapes from '../prop-shapes';
import Landmarks from './Landmarks';
import { selectedFace } from '../redux/selectors';
import { requestFaces } from '../redux/actions';

class LandmarksContainer extends PureComponent {
  componentDidMount() {
    this.props.onEnter();
  }
  componentDidUpdate() {
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
