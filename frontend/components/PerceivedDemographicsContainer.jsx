import { connect } from 'react-redux';
import {
  requestWorkload,
  saveDemographicAnnotations,
  completeWorkload,
} from '../redux/actions';
import {
  currentWorkloadItem,
  selectedWorkloadItemIndex,
  totalWorkloadItemCount,
  demographics,
  demographicsOrder,
} from '../redux/selectors';

import PerceivedDemographics from './PerceivedDemographics';

const mapStateToProps = state => ({
  image: currentWorkloadItem(state),
  demographics: demographics(state),
  questionOrder: demographicsOrder(state),
  current: selectedWorkloadItemIndex(state),
  total: totalWorkloadItemCount(state),
});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestWorkload()),
  onSubmit: annotations => dispatch(saveDemographicAnnotations(annotations)),
  onCompleteWorkload: () => dispatch(completeWorkload()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerceivedDemographics);
