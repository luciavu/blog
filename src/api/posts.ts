import axios from 'axios';
import type { Post } from '../types';

const API_URL = `${import.meta.env.VITE_API_URL}/posts`;

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};
