import * as controller from './controller';
import * as session from '../session/controller';

export const location = '/api/annotator';
export const routes = {
  post: {
    '/': [
      session.ensureSession,
      controller.postAnnotatorDemographics,
    ],
  },
};
