import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import LoadingContainer from './LoadingContainer';
import Home from './Home';
import PerceivedDemographicsContainer from './PerceivedDemographicsContainer';
import RegionsContainer from './RegionsContainer';
import LandmarksContainer from './LandmarksContainer';
import './App.styl';

const App = () => (
  <Router>
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/PerceivedDemographics">Demographics</Link>
          <Link to="/Regions">Regions</Link>
          <Link to="/Landmarks">Landmarks</Link>
        </nav>
      </header>

      <LoadingContainer />

      <Route exact path="/" component={Home} />
      <Route path="/PerceivedDemographics" component={PerceivedDemographicsContainer} />
      <Route path="/Regions" component={RegionsContainer} />
      <Route path="/Landmarks" component={LandmarksContainer} />

      <footer>
        footer controls
      </footer>
    </div>

  </Router>
);

export default App;
