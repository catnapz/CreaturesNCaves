import React from 'react';
import { cleanup, render, wait, getByText } from '@testing-library/react';
import { StaticRouter } from 'react-router';
import { SideBarItem } from "./side-bar-item";

describe("SideBarItem", () => {

  afterAll(() => {
    cleanup();
  });

  function wrappedRender(componentToRender: React.ReactNode) {
    return render(
      <StaticRouter>
        {componentToRender}
      </StaticRouter>
    )
  }

  it('should render successfully', async () => {
    const { baseElement } = wrappedRender(
      <SideBarItem 
        title="Test Item Title"
        to="/test-link"
      />
    );

    await wait(() => getByText(baseElement, "Test Item Title"));
    
  });
  
});