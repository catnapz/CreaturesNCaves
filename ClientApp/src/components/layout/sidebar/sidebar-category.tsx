import React from 'react';
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

interface SideBarCategoryProps {
  open: boolean
  title: string;
  children?: React.ReactElement | React.ReactElement[];
  first?: boolean;
}

export const SidebarCategory = (props: SideBarCategoryProps) => {
  
  const showFirstDivider = props.first && props.open;
  return (
    <>
      <Typography
        variant="overline"
        className={clsx('sidebar-category-text', {
          'visible': props.open
        })}
      >
        {props.title}
      </Typography>
      {showFirstDivider && <Divider variant='middle'/>}
      <List classes={{root: 'sidebar-category-list'}}>
        {props.children}
      </List>
    </>
  )
}
