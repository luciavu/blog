import { useEffect, useState } from 'react';
import { fetchPostById } from '../api/posts';
import type { Post, Comment } from '../types';
import { fetchCommentsFromPostId } from '../api/comments';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (id) {
      const postId = Number(id);
      if (!isNaN(postId)) {
        fetchPostById(postId)
          .then(setPost)
          .catch((err) => {
            console.error('Error loading post', err);
          });
        fetchCommentsFromPostId(postId)
          .then(setComments)
          .catch((err) => {
            console.error('Error loading comments', err);
          });
      }
    }
  }, [id]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <h3>{post.content}</h3>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.text}</p>
      ))}
    </div>
  );
};

export default PostDetails;
