import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  Home,
  SignIn,
  Companies,
  ReadQrcode,
  MyProductions,
  ReadQrcodeClient,
  Profile,
  Foods,
  MyEmployees,
  MySensors,
} from './pages';
import { PrivateRoute, PublicRoute } from './helpers';
import Batch from './pages/Batch';

const ADMINS = [
  'ADMIN_PRODUCER',
  'ADMIN_TRANSPORTER',
  'ADMIN_TRANSFORMER',
  'ADMIN_PACKER',
  'ADMIN_STORER',
  'ADMIN_SHOPKEEPERS',
];

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
          <Route path="/rastreabilidade/">
            <Batch />
          </Route>
          <PublicRoute exact path="/admin" component={SignIn} />
          <PrivateRoute
            exact
            path="/admin/dashboard"
            component={() => <h1>DASHBOARD</h1>}
            roles={'*'}
            notAllowed={[]}
          />
          <PrivateRoute
            exact
            path="/admin/producoes"
            component={MyProductions}
            roles={[
              'ADMIN_PRODUCER',
              'ADMIN_TRANSPORTER',
              'ADMIN_TRANSFORMER',
              'ADMIN_STORER',
              'ADMIN_SHOPKEEPER',
              'MANAGER_PRODUCER',
              'MANAGER_TRANSPORTER',
              'MANAGER_TRANSFORMER',
              'MANAGER_STORER',
              'MANAGER_SHOPKEEPER',
            ]}
            notAllowed={[]}
          />
          <PrivateRoute
            exact
            path="/admin/sensores"
            component={MySensors}
            roles={['ADMIN_TRANSPORTER', 'ADMIN_STORER']}
            notAllowed={[]}
          />
          <PrivateRoute
            exact
            path="/admin/ler-qrcode"
            component={ReadQrcode}
            roles={'*'}
            notAllowed={['ADMIN_BIOTRACE']}
          />
          <PrivateRoute
            exact
            path="/admin/perfil"
            component={Profile}
            roles={'*'}
            notAllowed={['ADMIN_BIOTRACE']}
          />
          <PrivateRoute
            exact
            path="/admin/funcionarios"
            component={MyEmployees}
            roles={ADMINS}
            notAllowed={[]}
          />
          <PrivateRoute
            exact
            path="/admin/alimentos"
            component={Foods}
            roles={['ADMIN_BIOTRACE']}
            notAllowed={[]}
          />
          <PrivateRoute
            exact
            path="/admin/empresas"
            component={Companies}
            roles={['ADMIN_BIOTRACE']}
            notAllowed={[]}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
