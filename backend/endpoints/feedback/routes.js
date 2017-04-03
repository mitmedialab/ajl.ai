import * as controller from './controller';

export const location = '/api/feedback';
export const routes = {
  post: {
    '/': controller.create,
  },
};
