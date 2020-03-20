import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/layout/layout';
import { Home } from './components/home';
import { Counter } from './components/counter/counter';
import './app.scss'
import { useSelector } from 'react-redux';
import { fromPromise } from 'apollo-boost';
import ApiAuthorizationRoutes from './api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './api-authorization/AuthorizeRoute';
import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';
import { LoginMenu } from './api-authorization/login-menu';
import { SignUpMenu } from './api-authorization/sign-up-menu';

export interface AppProps {
  loading: () => void;
  loaded: () => void;
}

export const App = (props: AppProps) => {
  
  // const loading = useSelector(selectLoading);
  const loading = false;

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
          <Route exact path='/' component={Home} />
          {/* <AuthRoute path='/counter' component={Counter} /> */}
          {/* <AuthorizeRoute path='/counter' component={Counter} /> */}
          <Route path='/counter' component={Counter} />
          <Route path='/login' component={LoginMenu} />
          <Route path='/signup' component={SignUpMenu} />
          {/* <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} /> */}
        </Layout>
      </>
    );
  }
};

export default App;