import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BasicLayout from './components/BasicLayout';

const App: React.FC = () => {
  return (
    <Router>
      <BasicLayout>
        <Switch>
          <Route path="/1">
            <h1>1</h1>
          </Route>
          <Route path="/2">
            <h1>2</h1>
          </Route>
          <Route path="/3">
            <h1>3</h1>
          </Route>
        </Switch>
      </BasicLayout>
    </Router>
  );
};

export default App;
