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
    return { cta: false, text: 'Welcome! Here is your first batch of batch of 12 images. Once you complete all 12, they\'ll be sent to us and you\'ll be able to annotate in batches of 3.' };
  }
  if (count === 1) {
    return { cta: true, text: 'You\'ve completed your first batch, great job! Please tell us about your experience:' };
  }
  if (count === 2) {
    return { cta: true, text: 'You\'re a champ, that\'s 2 batches, keep going!' };
  }
  if (count === 3) {
    return { cta: false, text: 'You\'re on a roll, with three batches. Thank you for all your help. Keep it up!' };
  }
  if (count % 10) {
    return '';
  }
  return { cta: true, text: `You've completed ${count} batches! Amazing!` };
}
