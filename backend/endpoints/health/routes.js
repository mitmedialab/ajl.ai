import * as controller from './controller';

export const location = '/api/health-check';

export const routes = {
  get: {
    '/': [
      controller.healthCheck,
    ],
  },
};
