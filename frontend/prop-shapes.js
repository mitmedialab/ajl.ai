import { PropTypes } from 'react';

export const workloadItem = PropTypes.shape({
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
});

export const demographicQuestion = PropTypes.shape({
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const demographicsQuestionList = PropTypes.arrayOf(PropTypes.string);
