import React, {MouseEventHandler} from 'react';
import MuiButton from '@material-ui/core/Button';
import './button.scss';


interface IButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger"
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: IButtonProps) => {
  
  const {children, variant} = props;
  
  return (
    <MuiButton
      variant='contained'
      classes={{root: `button ${variant ? variant : 'primary'}-button`}}
      onClick={props.onClick}
    >
      {children}
    </MuiButton>
  );
}
