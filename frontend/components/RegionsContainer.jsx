import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as propShapes from '../prop-shapes';
import Regions from './Regions';
import { selectedFace } from '../redux/selectors';
import { requestFaces } from '../redux/actions';

class RegionsContainer extends PureComponent {
  componentDidMount() {
    this.props.onEnter();
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
  onEnter: PropTypes.func.isRequired,
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
