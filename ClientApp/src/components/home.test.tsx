import React from 'react';
import { cleanup, getByText, render, wait } from '@testing-library/react';
import { Home } from './home';

describe('Home', () => {

    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<Home/>);
        await wait(() => getByText(baseElement, 'Welcome to Creatures & Caves'));
    });

});