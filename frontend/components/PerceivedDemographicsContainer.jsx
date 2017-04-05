import { connect } from 'react-redux';
import {
  requestWorkload,
  saveDemographicAnnotations,
  flagImage,
  completeWorkload,
} from '../redux/actions';
import {
  currentWorkloadItem,
  selectedWorkloadItemIndex,
  totalWorkloadItemCount,
  demographicAttributes,
  flagAttribute,
  demographicAttributesOrder,
} from '../redux/selectors';

import PerceivedDemographics from './PerceivedDemographics';

const mapStateToProps = state => ({
  image: currentWorkloadItem(state),
  demographicAttributes: demographicAttributes(state),
  flagAttribute: flagAttribute(state),
  questionOrder: demographicAttributesOrder(state),
  current: selectedWorkloadItemIndex(state),
  total: totalWorkloadItemCount(state),
});

const mapDispatchToProps = dispatch => ({
  onEnter: () => dispatch(requestWorkload()),
  onSubmit: annotations => dispatch(saveDemographicAnnotations(annotations)),
  onFlag: annotation => dispatch(flagImage(annotation)),
  onCompleteWorkload: () => dispatch(completeWorkload()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerceivedDemographics);
