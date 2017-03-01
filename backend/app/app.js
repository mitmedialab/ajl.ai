import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from '../services/session';
import routeBuilder from 'express-routebuilder';
import endpoints from '../endpoints';
import { SHOW_ERRORS, HTTP_QUIET } from '../../config';

const debugRouteBuilder = debug('routeBuilder');

export default function appMaker (routes) {
  routes = routes || endpoints;
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session);
  app.use(morgan('combined', { skip: () => HTTP_QUIET }));
  app.use(routes.map(endpoint => {
    debugRouteBuilder(`Loading routes for endpoint: ${endpoint.location}`);
    return routeBuilder(
      express.Router(),
      endpoint.routes,
      endpoint.location
    );
  }));
  app.use(function (req, res, next) {
    res.status(404).send('404 Not Found');
  });
  app.use(function (err, req, res, next) {
    res.status(500);
    if (!(err instanceof Error)) {
      return res.send(err);
    }
    if (SHOW_ERRORS) {
      return res.send(Object.getOwnPropertyNames(err).reduce((res, key) => {
        return Object.assign(res, {
          [key]: err[key]
        });
      }, {}));
    }
    res.send('Internal Error');
  });
  return app;
}
