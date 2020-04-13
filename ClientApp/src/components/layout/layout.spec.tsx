import React from "react";
import { render, wait, getByText, cleanup } from "@testing-library/react";
import { Layout } from "./layout";

jest.mock('./nav-menu', () => ({
  NavMenu: 'mocked-nav-menu'
}));

jest.mock('./side-bar', () => ({
  SideBar: 'mocked-side-bar'
}));

describe('Layout', () => {

  afterEach(() => {
    cleanup();
  });
  
  it('renders successfully', async () => {
    const { baseElement } = render(<Layout children={<p>unit test</p>}/>);
    await wait(() => getByText(baseElement, "unit test"));
  });

});