import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./nav-menu.scss";
import { useSelector } from "react-redux";
import {
  selectAuthenticated,
  selectUserProfile
} from "../auth/auth-store.slice";

export const NavMenu = () => {
  const authenticated = useSelector(selectAuthenticated);
  const userProfile = useSelector(selectUserProfile);
  const [isResp, setResp] = useState(false);
  
  return (
    <>
      <nav id="top-nav" className={"responsive-" + isResp}>
        {authenticated ? <AuthenticatedView username={userProfile?.name}/> : <UnauthenticatedView/>}
        <div onClick={() => setResp(!isResp)} id="nav-burger">
          {isResp ? "Close" : "Open"}
        </div>
      </nav>
    </>
  );

}

const UnauthenticatedView = () => (
  <>
    <Link to="/">Creatures &amp; Caves</Link>
    <NavLink exact to="/">
      Home
    </NavLink>
    <NavLink to="/counter">Counter</NavLink>
    <NavLink to="/login">Login</NavLink>
    <NavLink to="/signup">Sign Up</NavLink>
  </>
);

const AuthenticatedView = (props: any) => (
  <>
    <Link to="/">Creatures &amp; Caves</Link>
    <NavLink exact to="/">
      Home
    </NavLink>
    <NavLink to="/counter">Counter</NavLink>
    <NavLink to="/logout">Logout</NavLink>
    <NavLink to="/profile">{props.username}</NavLink>
  </>
);
