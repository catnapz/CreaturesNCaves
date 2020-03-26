import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from './auth-store.slice';

export const Logout = () => {
  useDispatch()(signOut());
  return <span>loading</span>;
}