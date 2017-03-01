import * as controller from './controller';

export const location = '/health-check';

export const routes = {
  get: {
    '/': [
      controller.healthCheck,
    ],
  },
};
