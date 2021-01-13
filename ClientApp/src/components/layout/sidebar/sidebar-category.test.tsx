import React from 'react';
import { cleanup, render, waitFor, getByText } from '@testing-library/react';
import { SidebarCategory } from "./sidebar-category";

describe("SidebarCategory", () => {

  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(<SidebarCategory open={false} title={"Test Category Title"}/>);

    await waitFor(() => getByText(baseElement as HTMLElement, "Test Category Title"));
    
  });

  it('should contain visible className when open', async () => {
    const { baseElement } = render(<SidebarCategory open={true} title={"Test Category Title"}/>);

    await waitFor(() => getByText(baseElement as HTMLElement, (content, element) => {
      return element!.classList.contains("visible") && content === "Test Category Title";
    }));
    
  });

  
});