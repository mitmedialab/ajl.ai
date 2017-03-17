// Support all ES6 functionality, particularly the generators used by sagas
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';

// Provider makes the store available to connected components
import { Provider } from 'react-redux';

import { requestAttributes } from './redux/actions';

import makeStore from './redux/store';

import './global.styl';

import App from './components/App';

const store = makeStore();

// Annotations record defines the content used to render out each form
// within the application: since it is not form-specific, we load it
// here on app initialization to get the data as soon as possible
store.dispatch(requestAttributes());

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Kick off initial render
render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
