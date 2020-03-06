import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './nav-menu.scss';

export const NavMenu = () => {
  const [isResp, setResp] = useState(false);

  return (
    <>
      <nav id="top-nav" className={"responsive-"+isResp}>
        <Link to="/">Creatures &amp; Caves</Link>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/counter">Counter</NavLink>
  <div onClick={() => setResp(!isResp)} id="nav-burger">{isResp ? "Close" : "Open" }</div>
      </nav>
    </>
  );

}
