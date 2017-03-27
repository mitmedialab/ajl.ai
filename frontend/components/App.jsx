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
      <Route path="/PerceivedDemographics" component={PerceivedDemographicsContainer} />

      <footer>
        footer controls
      </footer>
    </div>

  </Router>
);

export default App;
