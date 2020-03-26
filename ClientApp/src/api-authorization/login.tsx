import React from 'react';
import { useDispatch } from 'react-redux';
import { signInRedirectCallback } from './auth-store.slice';

export const Login = () => {
  useDispatch()(signInRedirectCallback());
  return <span>loading</span>;
}