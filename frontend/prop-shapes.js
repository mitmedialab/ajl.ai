import { PropTypes } from 'react';

export const face = PropTypes.shape({
  id: PropTypes.string.isRequired,
  perceivedGender: PropTypes.string.isRequired,
  perceivedAge: PropTypes.number.isRequired,
  perceivedEthnicity: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  landmarks: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })),
});

export const workloadItem = PropTypes.shape({
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
});

export const faces = PropTypes.arrayOf(face);

export const demographicQuestion = PropTypes.shape({
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const demographicsQuestionList = PropTypes.arrayOf(PropTypes.string);
