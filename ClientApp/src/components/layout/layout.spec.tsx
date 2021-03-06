import React from "react";
import { render, waitFor, getByText, cleanup } from "@testing-library/react";
import { Layout } from "./layout";

jest.mock('./nav-menu/nav-menu', () => ({
  NavMenu: 'mocked-nav-menu'
}));

jest.mock('./sidebar/sidebar', () => ({
  Sidebar: 'mocked-sidebar'
}));

jest.mock('./notifications/notifications', () => ({
  Notifications: 'mocked-notifications'
}));

describe('Layout', () => {

  afterEach(() => {
    cleanup();
  });
  
  it('renders successfully', async () => {
    const { baseElement } = render(<Layout children={<p>unit test</p>}/>);
    await waitFor(() => getByText(baseElement as HTMLElement, "unit test"));
  });

});