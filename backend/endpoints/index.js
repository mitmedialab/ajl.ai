import * as healthCheck from './health/routes';
import * as annotations from './annotations/routes';
import * as annotator from './annotator/routes';
import * as feedback from './feedback/routes';
import * as session from './session/routes';

export default [
  healthCheck,
  annotations,
  annotator,
  feedback,
  session,
];
