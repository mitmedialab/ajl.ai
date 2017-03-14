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
    const { image } = this.props;
    return (
      <Regions image={image} />
    );
  }
}

RegionsContainer.propTypes = {
  image: propShapes.workloadItem,
  onEnter: PropTypes.func.isRequired,
};

RegionsContainer.defaultProps = {
  image: null,
};

const mapStateToProps = state => ({
  image: currentWorkloadItem(state),
});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestWorkload()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionsContainer);
