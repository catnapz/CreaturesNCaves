import React from 'react';
import { cleanup, render, wait, getByText } from '@testing-library/react';
import { SideBarCategory } from "./side-bar-category";

describe("SideBarCategory", () => {

  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(<SideBarCategory open={false} title={"Test Category Title"}/>);

    await wait(() => getByText(baseElement, "Test Category Title"));
    
  });

  it('should contain visible className when open', async () => {
    const { baseElement } = render(<SideBarCategory open={true} title={"Test Category Title"}/>);

    await wait(() => getByText(baseElement, (content, element) => {
      return element.classList.contains("visible") && content === "Test Category Title";
    }));
    
  });

  
});