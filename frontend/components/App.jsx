import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import { isLoading, appErrors } from '../redux/selectors';

import Modal from './Overlays/Modal';
import LoadingIndicator from './Overlays/Loading';

import Home from './Home';
import PerceivedDemographicsContainer from './PerceivedDemographicsContainer';
import './App.styl';

const App = props => (
  <Router>
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/PerceivedDemographics">Demographics</Link>
        </nav>
      </header>

      {/* Overlays & Modal Dialogs */}
      {props.isLoading ? <LoadingIndicator /> : null}
      {props.errors.map(error => (
        <Modal
          key={`error_modal_${error.retryAction.type}`}
          onConfirm={() => props.dispatch(error.retryAction)}
          confirmText="Retry"
        >
          <h2>Error</h2>
          <p>{error.error.message}</p>
        </Modal>
      ))}

      <Route exact path="/" component={Home} />
      <Route path="/PerceivedDemographics" component={PerceivedDemographicsContainer} />

      <footer>
        footer controls
      </footer>
    </div>

  </Router>
);

App.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    error: PropTypes.instanceOf(Error).isRequired,
    retryAction: PropTypes.shape({
      type: PropTypes.string.isRequired,
      payload: PropTypes.any,
    }),
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  errors: appErrors(state),
  isLoading: isLoading(state),
});

export default connect(mapStateToProps)(App);
