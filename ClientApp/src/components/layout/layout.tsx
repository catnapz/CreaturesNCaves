import * as React from 'react';
import { NavMenu } from './nav-menu';

export const Layout = (props: { children?: React.ReactNode }) => (
  <>
    <NavMenu />
    {props.children}
  </>
);
