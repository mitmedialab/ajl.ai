import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { isLoading } from '../redux/selectors';

import LoadingOverlay from './Overlays/Loading';

const LoadingContainer = props => (
  <LoadingOverlay isLoading={props.isLoading} />
);

LoadingContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: isLoading(state),
});

export default connect(mapStateToProps)(LoadingContainer);
