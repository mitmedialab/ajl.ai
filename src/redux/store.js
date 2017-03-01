import { createStore, applyMiddleware } from 'redux';
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

  // Hot module replacement seems like a decent indicator of a dev environment
  if (module.hot) {
    // debugging middleware that logs actions
    middleware.push(createLogger({
      collapsed: true,
    }));
  }

  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware),
  );

  sagaMiddleware.run(rootSaga);

  window.store = store;

  return store;
}
