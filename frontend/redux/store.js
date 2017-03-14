import { createStore, applyMiddleware, compose as baseCompose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

/**
 * Helper function to create store with provided reducer and initial state.
 *
 * @return {Object} An object that holds the complete state of the App.
 */

export default function makeStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    sagaMiddleware,
  ];

  let compose = baseCompose;

  // in the non-production builds, mix in debugging middlewares
  if (process.env.NODE_ENV !== 'production') {

    // eslint-disable-next-line no-underscore-dangle
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      // eslint-disable-next-line no-underscore-dangle
      compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }

    // debugging middleware that logs actions
    middleware.push(createLogger({
      collapsed: true,
    }));
  }

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware)),
  );

  sagaMiddleware.run(rootSaga);

  window.store = store;

  return store;
}
