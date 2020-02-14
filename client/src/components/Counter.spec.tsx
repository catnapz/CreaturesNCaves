/** 
 * Unit tests for Counter Component
 */

import { cleanup, getByText, render, wait } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import Counter from './Counter';

const mockStore = configureStore();

describe('Counter Component Tests', () => {

    afterEach(() => {
        cleanup();
    });

    it('should display count', async () => {
        let state = {
            counter: {
                count: 10
            }
        };
        const store = mockStore(() => state);
        const { baseElement } = render(
            <Provider store={store}>
                <Counter />
            </Provider>
        );
        await wait(() => getByText(baseElement, (content, element) => {
            return element.id === 'count' && content === '10';
        }));
    });

    it('should contain Increment button', async () => {
        let state = {
            counter: {
                count: 0
            }
        };
        const store = mockStore(() => state);
        const { baseElement } = render(
            <Provider store={store}>
                <Counter />
            </Provider>
        );
        await wait(() => getByText(baseElement, (content, element) => {
            return element.tagName.toLowerCase() === 'button' && content === 'Increment';
        }));
    });

});