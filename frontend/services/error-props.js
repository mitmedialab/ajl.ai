/**
 * This service abstracts a lot of the determinations about the content
 * and actions that will be shown on the event of an error, by using the
 * type of the rejection action to return an error title, confirmation
 * button text, and cancellation button text/cancellation button action
 * as appropriate.
 */
import * as actions from '../redux/actions';

export default function(type) {
  switch (type) {
  case actions.REQUEST_ATTRIBUTES_FAILED:
    return {
      errorTitle: 'Application Load Error',
      confirmText: 'Retry',
    };

  case actions.REQUEST_WORKLOAD_FAILED:
    return {
      errorTitle: 'Data Load Error',
      confirmText: 'Retry',
    };

  case actions.COMPLETE_WORKLOAD_FAILED:
    return {
      errorTitle: 'Data Save Error',
      confirmText: 'Retry',
      cancelAction: actions.requestWorkload(),
      cancelText: 'Start Over',
    };

  default:
    return {
      errorTitle: 'Error',
      confirmText: 'OK',
    };
  }
}
