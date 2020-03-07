import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/layout/layout';
import { Home } from './components/home';
import { Counter } from './components/counter/counter';

import './app.scss'
import { useSelector } from 'react-redux';

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
          <Route path='/counter' component={Counter} />
          {/* <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
        </Layout>
      </>
    );
  }
};

export default App;