import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Enter } from './features/enter/Enter';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Enter />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
