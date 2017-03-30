/**
 * This service abstracts a lot of the determinations about the content
 * and actions that will be shown on the event of an error, by using the
 * type of the rejection action to return an error title, confirmation
 * button text, and cancellation button text/cancellation button action
 * as appropriate.
 */
import * as actions from '../redux/actions';

export function errorProps(type) {
  switch (type) {
  case actions.REQUEST_ATTRIBUTES_FAILED:
    return {
      errorTitle: 'Application Load Error',
      confirmText: 'Retry',
    };

  case actions.REQUEST_OVERALL_STATS_FAILED:
    return {
      errorTitle: 'Global Statistics Load Error',
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

export function workloadFeedback(count) {
  if (count === 0) {
    return 'Welcome! This is your first batch of images.';
  }
  if (count === 1) {
    return 'You\'ve completed your first batch—great!';
  }
  if (count === 2) {
    return 'You\'re a champ!';
  }
  if (count === 3) {
    return 'You\'re on fire!';
  }
  if (count % 10) {
    return '';
  }
  return `You've completed ${count} batches! Amazing!`;
}
