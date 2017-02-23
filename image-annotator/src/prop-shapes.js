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

export const faces = PropTypes.arrayOf(face);
