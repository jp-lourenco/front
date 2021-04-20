import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import api from '../services/api';

interface TokenJWT {
  exp: number;
  role: string;
}

const PublicRoute = ({
  exact,
  path,
  component: Component,
}: {
  exact: boolean;
  path: string;
  component: React.FC;
}) => {
  const { isSignedIn } = useSelector((state: any) => state.auth);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    api
      .get('verify-token', { headers: { Authorization: 'Bearer ' + token } })
      .then(() => {
        if (token) {
          let tokenExpiration = jwtDecode<TokenJWT>(token)?.exp;
          let dateNow = new Date();

          if (tokenExpiration < dateNow.getTime() / 1000) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }, [isSignedIn]);

  if (isAuthenticated == null) {
    return <></>;
  }

  if (isAuthenticated) {
    return <Redirect to="/admin/producoes" />;
  } else {
    return (
      <Route exact={exact} path={path}>
        <Component />
      </Route>
    );
  }
};

export default PublicRoute;
