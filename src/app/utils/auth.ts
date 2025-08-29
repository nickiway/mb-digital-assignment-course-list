/** @format */

import type { UserType } from '../types/user';

export const loginUser = (user: UserType) => {
  const { name, email } = user;
  localStorage.setItem('currentUser', JSON.stringify({ name, email }));
};

export const userLogged = () => {
  const user = localStorage.getItem('currentUser');
  console.log(user);
  return typeof user === 'string';
};
