import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import BasicLayout from './components/BasicLayout';
import SignIn from './pages/SignIn';
import SearchQrcode from './pages/SearchQrcode';
import ReadQrcode from './pages/ReadQrcode';
import MyProductions from './pages/MyProductions';
import CreateProduction from './pages/CreateProduction';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <BasicLayout>
            <Route path="/admin/dashboard">
              <h1></h1>
            </Route>
            <Route path="/admin/producoes">
              <MyProductions />
            </Route>
            <Route path="/admin/criar-producao">
              <CreateProduction />
            </Route>
            <Route path="/admin/ler-qrcode">
              <ReadQrcode />
            </Route>
            <Route path="/admin/pesquisar-qrcode">
              <SearchQrcode />
            </Route>
          </BasicLayout>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
