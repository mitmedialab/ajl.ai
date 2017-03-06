import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import fabric from '../services/fabric';
import * as propShapes from '../prop-shapes';
import Regions from './Regions';
import { selectedFace } from '../redux/selectors';
import { requestFaces } from '../redux/actions';

class RegionsContainer extends PureComponent {
  componentDidMount() {
    this.props.onEnter();
  }
  componentDidUpdate() {
  }

  render() {
    const { face } = this.props;
    return (
      <Regions face={face} />
  );
  }
}

RegionsContainer.propTypes = {
  face: propShapes.face,
};

RegionsContainer.defaultProps = {
  face: null,
};

const mapStateToProps = state => ({
  face: selectedFace(state),
});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestFaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionsContainer);
