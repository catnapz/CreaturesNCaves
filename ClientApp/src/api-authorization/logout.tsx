import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './auth-store.slice';

export const Logout = () => {
  useDispatch()(logout());
  return <span>loading</span>;
}