import api from './api';
import type { Post } from '../types';

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get('/posts');
  return res.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};
