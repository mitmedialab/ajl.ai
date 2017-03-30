import { connect } from 'react-redux';
import { requestOverallStats } from '../redux/actions';
import { overallAnnotated, overallImages } from '../redux/selectors';
import KnownOverallProgress from './KnownOverallProgress';

const mapStateToProps = state => ({
  annotated: overallAnnotated(state),
  images: overallImages(state),
});

const mapDispatchToProps = dispatch => ({
  loadOverallStats: () => dispatch(requestOverallStats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(KnownOverallProgress);
