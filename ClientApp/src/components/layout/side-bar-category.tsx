import React from 'react';
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";

interface SideBarCategoryProps {
  open: boolean
  title: string;
  children?: React.ReactElement;
}

export const SideBarCategory = (props: SideBarCategoryProps) => {
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
      <Divider variant='middle'/>
      {props.children}
    </>
  )
};