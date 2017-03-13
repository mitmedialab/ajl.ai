import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as propShapes from '../prop-shapes';
import Landmarks from './Landmarks';
import { currentWorkloadItem } from '../redux/selectors';
import { requestWorkload } from '../redux/actions';

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
  face: propShapes.workloadItem,
  onEnter: PropTypes.func.isRequired,
};

LandmarksContainer.defaultProps = {
  face: null,
};

const mapStateToProps = state => ({
  face: currentWorkloadItem(state),
});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestWorkload()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandmarksContainer);
