import React from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import { fromPromise } from 'apollo-boost';

import { Layout } from './components/layout/layout';
import { Home } from './components/home';
import { Counter } from './components/counter/counter';
import { ApplicationPaths } from './api-authorization/api-auth-constants';
import { AuthRoute } from './api-authorization/auth-route';
import { LoginMenu } from './api-authorization/login-menu';
import { SignUpMenu } from './api-authorization/sign-up-menu';
import { selectAuthCheckLoading } from './api-authorization/auth-store.slice';
import { ApiAuthorizationRoutes } from './api-authorization/api-auth-routes';

import './app.scss'
import { LogoutMenu } from './api-authorization/logout-menu';

export interface AppProps {
  loading: () => void;
  loaded: () => void;
}

export const App = (props: AppProps) => {
  
  const loading = useSelector(selectAuthCheckLoading);

  if (loading) {
    props.loading();
    return (
      <>
      </>
    );
  } else {
    props.loaded();
    return (
      <>
        <Layout>
          <Route exact path='/' component={Home}/>
          <AuthRoute path='/counter' component={Counter}/>
          <Route path='/login' component={LoginMenu}/>
          <Route path='/logout' component={LogoutMenu}/>
          <Route path='/signup' component={SignUpMenu}/>
          <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes}/>
        </Layout>
      </>
    );
  }
};

export default App;