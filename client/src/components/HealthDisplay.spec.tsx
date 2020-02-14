/** 
 * Unit tests for HealthDisplay
 * Note: Used to figure out how to test React-redux
 */

import { cleanup, getByText, render, wait } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import HealthDisplay from './HealthDisplay';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('HealthDisplay Component Tests', () => {

    afterEach(() => {
        cleanup();
        delete (global as any)['fetch'];
    });

    it('should display loading state', async () => {
        
        (global as any)['fetch'] = jest.fn().mockResolvedValue({status: 200});

        let state: any = {
            health: {
                healthy: false,
                isLoading: true
            }
        };

        const store = mockStore(() => state);

        const { baseElement } = render(
            <Provider store={store}>
                <HealthDisplay />
            </Provider>
        );
        await wait(() => getByText(baseElement, 'checking health...'));
    });

    it('should display Healthy', async () => {
        
        (global as any)['fetch'] = jest.fn().mockResolvedValue({status: 200});

        let state: any = {
            health: {
                healthy: true
            }
        };

        const store = mockStore(() => state);

        const { baseElement } = render(
            <Provider store={store}>
                <HealthDisplay />
            </Provider>
        );
        await wait(() => getByText(baseElement, 'HEALTHY', {exact:true}));
    });

    it('should display Unhealthy', async () => {
        
        (global as any)['fetch'] = jest.fn().mockResolvedValue({status: 200});

        let state: any = {
            health: {
                healthy: false
            }
        };

        const store = mockStore(() => state);

        const { baseElement } = render(
            <Provider store={store}>
                <HealthDisplay />
            </Provider>
        );
        await wait(() => getByText(baseElement, 'UNHEALTHY', {exact:true}));
    });

});