import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as propShapes from '../prop-shapes';
import Regions from './Regions';
import { currentWorkloadItem } from '../redux/selectors';
import { requestWorkload } from '../redux/actions';

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
  face: propShapes.workloadItem,
  onEnter: PropTypes.func.isRequired,
};

RegionsContainer.defaultProps = {
  face: null,
};

const mapStateToProps = state => ({
  face: currentWorkloadItem(state),
});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestWorkload()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionsContainer);
