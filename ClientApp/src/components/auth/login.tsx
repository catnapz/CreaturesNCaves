import React from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from './auth-store.slice';

export const Login = () => {
  useDispatch()(signIn());
  return <span>loading</span>;
}