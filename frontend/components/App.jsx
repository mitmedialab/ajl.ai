import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Header from './Header/Header';
import ModalContainer from './ModalContainer';

import Home from './Home';
import PerceivedDemographicsContainer from './PerceivedDemographicsContainer';
import './App.styl';

const App = () => (
  <Router>
    <div>
      <Header />

      {/* Overlays & Modal Dialogs */}
      <ModalContainer />

      <Route exact path="/" component={Home} />
      <Route path="/annotate" component={PerceivedDemographicsContainer} />

      <footer>
        <h4>We welcome your comments</h4>
        <a href="https://docs.google.com/forms/d/1UsW1hGalLGVQ8xSdCpDp_tq2So24tdiq084n8wUiWic/viewform?edit_requested=true">Submit Feedback</a>
      </footer>
    </div>

  </Router>
);

export default App;
