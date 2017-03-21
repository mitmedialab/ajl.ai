import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import LoadingContainer from './LoadingContainer';
import Home from './Home';
import PerceivedDemographicsContainer from './PerceivedDemographicsContainer';
import './App.styl';

const App = () => (
  <Router>
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/PerceivedDemographics">Demographics</Link>
        </nav>
      </header>

      <LoadingContainer />

      <Route exact path="/" component={Home} />
      <Route path="/PerceivedDemographics" component={PerceivedDemographicsContainer} />

      <footer>
        footer controls
      </footer>
    </div>

  </Router>
);

export default App;
