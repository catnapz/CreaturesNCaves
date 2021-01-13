import React from 'react';
import { cleanup, getByText, render, waitFor } from '@testing-library/react';
import { InProgress } from './in-progress';

describe('InProgress', () => {

    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<InProgress/>);
        await waitFor(() => getByText(baseElement as HTMLElement, 'In Progress'));
    });

});