import React from 'react';
import { cleanup, getByText, render, waitFor } from '@testing-library/react';
import { Home } from './home';

describe('Home', () => {

    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<Home/>);
        await waitFor(() => getByText(baseElement as HTMLElement as HTMLElement, 'Welcome to Creatures & Caves'));
    });

});