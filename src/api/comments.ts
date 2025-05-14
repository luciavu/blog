import api from './api';
import type { Comment } from '../types';

export const fetchCommentsFromPostId = async (id: number): Promise<Comment[]> => {
  const res = await api.get(`/posts/${id}/comments`);
  return res.data;
};
