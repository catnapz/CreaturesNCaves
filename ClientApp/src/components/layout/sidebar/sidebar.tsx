import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SidebarItem } from "./sidebar-item";
import { SidebarCategory } from "./sidebar-category";
import { useSelector } from "react-redux";
import { selectUser } from "../../user/auth/auth-store.slice";
import "./sidebar.scss";

interface SidebarProps {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  const { isDrawerOpen } = props;
  const authenticated = useSelector(selectUser);
  
  const getClass = () => {
    return isDrawerOpen ? "drawer-open" : "drawer-closed"
  }

  return (
    <Drawer
      variant="permanent"
      id="side-bar"
      classes={{
        paper: "side-bar-contents " + getClass()
      }}
    >
      <div className='side-bar-tools'>
        <IconButton id='side-bar-close-icon' onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      
      <SidebarCategory open={props.isDrawerOpen} title={"Quick Tools"} first>
          <SidebarItem to="/roll-initiative" title={"Combat"} open={isDrawerOpen} />
          <SidebarItem to="/boblin" title={"Random Character"} open={isDrawerOpen} />
          <SidebarItem to="/loot" title={"Random Loot"} open={isDrawerOpen} />
      </SidebarCategory>

      {authenticated &&
      <SidebarCategory open={props.isDrawerOpen} title={"Game Master"}>
              <SidebarItem to="/counter" title={"Counter"} subtitle={"Dev Test"} open={isDrawerOpen} />
              <SidebarItem to="/campaigns" title={"Campaigns"} open={isDrawerOpen}/>
              <SidebarItem to="/characters" title={"Characters"} open={isDrawerOpen} />
      </SidebarCategory>
      }
      
    </Drawer>
  );
}