import type { User } from '../types';
import api from './api';
export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get('/users');
  console.log(res.data);
  return res.data;
};
