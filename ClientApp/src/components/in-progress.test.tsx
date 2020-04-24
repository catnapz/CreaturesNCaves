import React from 'react';
import { cleanup, getByText, render, wait } from '@testing-library/react';
import { InProgress } from './in-progress';

describe('InProgress', () => {

    afterEach(() => {
        cleanup();
    });

    it('should render successfully', async () => {
        const { baseElement } = render(<InProgress/>);
        await wait(() => getByText(baseElement, 'In Progress'));
    });

});