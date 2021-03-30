import React from "react";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

import { useUser } from "../../../../../auth";
import authService from "../../../../../auth/auth.service";
import { PlaceHolderIcon } from "../../../../../components/icons";

import "./user-profile-button.scss";

const UserProfileButton = () => {
  const user = useUser();

  const profilePicUrl = user?.photoURL || undefined;

  const displayPic = !!profilePicUrl ? (
    <Image
      roundedCircle
      src={profilePicUrl}
      className="cnc-user-profile-dropdown-img"
    />
  ) : (
    <PlaceHolderIcon className="cnc-user-profile-dropdown-img-placeholder" />
  );

  return (
    <NavDropdown
      alignRight
      title={displayPic}
      id="user-profile-dropdown"
      className="cnc-user-profile-dropdown"
    >
      <NavDropdown.Header>
        Hello {user?.displayName || user?.email || ""}
      </NavDropdown.Header>
      <NavDropdown.Divider />
      <NavLink
        to="/profile"
        className="cnc-user-profile-dropdown-item cnc-user-profile-dropdown-item-link"
      >
        Profile
      </NavLink>
      <div
        className="cnc-user-profile-dropdown-item"
        onClick={() => authService.signOut()}
      >
        Logout
      </div>
    </NavDropdown>
  );
};

export default UserProfileButton;
