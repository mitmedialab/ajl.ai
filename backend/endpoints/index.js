import * as healthCheck from './health/routes';
import * as annotations from './annotations/routes';
import * as feedback from './feedback/routes';

export default [
  healthCheck,
  annotations,
  feedback,
];
