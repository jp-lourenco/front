import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  Home,
  SignIn,
  SearchQrcode,
  ReadQrcode,
  MyProductions,
  ReadQrcodeClient,
  Profile,
  MyEmployees,
} from './pages';
import { BasicLayout } from './components';
import { PrivateRoute, PublicRoute } from './helpers';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/rastreabilidade">
            <ReadQrcodeClient />
          </Route>
          <PublicRoute exact path="/admin" component={SignIn} />
          <BasicLayout>
            {/* <Route exact path="/admin/dashboard">
              <h1></h1>
            </Route> */}
            <PrivateRoute
              exact
              path="/admin/producoes"
              component={MyProductions}
              roles={['ADMIN_PRODUCER', 'ADMIN_TRANSPORTER']}
            />
            <PrivateRoute
              exact
              path="/admin/ler-qrcode"
              component={ReadQrcode}
              roles={'*'}
            />
            <PrivateRoute
              exact
              path="/admin/perfil"
              component={Profile}
              roles={'*'}
            />
            <PrivateRoute
              exact
              path="/admin/funcionarios"
              component={MyEmployees}
              roles={['ADMIN_PRODUCER', 'ADMIN_TRANSPORTER']}
            />
            <PrivateRoute
              exact
              path="/admin/pesquisar-qrcode"
              component={SearchQrcode}
              roles={['EMPLOYEE_PRODUCER']}
            />
          </BasicLayout>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
