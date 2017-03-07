import * as controller from './controller';
import * as session from '../session/controller';

export const location = '/api/annotations';
export const routes = {
  get: {
    '/types': [
      session.ensureSession,
      controller.getTypes,
    ],
    '/workload': [
      session.ensureSession,
      controller.getWorkload,
    ],
  },
  post: {
    '/': [
      session.ensureSession,
      controller.postAnnotations,
    ],
  },
};
