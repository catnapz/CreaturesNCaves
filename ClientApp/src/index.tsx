import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ReduxStore, history } from './store/ReduxStore';
import { App } from './app';
import * as serviceWorker from './serviceWorker';
import './index.scss';

// root load animation
const loader: HTMLElement | null = document.getElementById('loader');;
const loading = () => loader!.style.display = "block";
const loaded = () => loader!.style.display = "none";

// Init the API client
// const apolloClient = new ApolloClient({
//   uri: 'https://'+ apiEndpointHostname +'/api/graphql'
// });

ReactDOM.render(
    <Provider store={ReduxStore}>
        <ConnectedRouter history={history}>
            <App loading={loading} loaded={loaded}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
