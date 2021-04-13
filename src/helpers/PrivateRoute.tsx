import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

interface TokenJWT {
  exp: number;
  role: string;
}

const PrivateRoute = ({
  exact,
  path,
  component: Component,
  roles,
}: {
  exact: boolean;
  component: React.FC;
  path: string;
  roles: string[] | string;
}) => {
  const { isSignedIn } = useSelector((state: any) => state.auth);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [canPermission, setCanPermission] = useState<boolean | null>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiration = jwtDecode<TokenJWT>(token)?.exp;
      const userRole = jwtDecode<TokenJWT>(token)?.role;
      const dateNow = new Date();
      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        if (roles === '*' || roles?.includes(userRole)) {
          setCanPermission(true);
        } else {
          setCanPermission(false);
        }
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [isSignedIn]);

  if (isAuthenticated == null) {
    return <></>;
  }

  if (!isAuthenticated) {
    return <Redirect to="/admin" />;
  } else if (canPermission) {
    return (
      <Route exact={exact} path={path}>
        <Component />
      </Route>
    );
  } else {
    return (
      <Route exact={exact} path={path}>
        <h1>Acesso não permitido.</h1>
      </Route>
    );
  }
};

export default PrivateRoute;
