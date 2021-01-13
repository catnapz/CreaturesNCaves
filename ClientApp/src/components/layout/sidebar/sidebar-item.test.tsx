import React from 'react';
import { cleanup, render, waitFor, getByText } from '@testing-library/react';
import { StaticRouter } from 'react-router';
import { SidebarItem } from "./sidebar-item";

describe("SidebarItem", () => {

  afterEach(() => {
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
      <SidebarItem 
        title="Test Item Title"
        to="/test-link"
      />
    );

    await waitFor(() => getByText(baseElement as HTMLElement, "Test Item Title"));
    
  });
  
});