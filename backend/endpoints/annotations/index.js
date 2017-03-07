import * as controller from './controller';

export const location = '/api/annotations';
export const routes = {
  get: {
    '/types': [
      controller.getTypes,
    ],
  },
};
