import { useEffect, useState } from 'react';
import { fetchPostById } from '../../api/posts';
import type { Post, Comment } from '../../types';
import { fetchCommentsFromPostId } from '../../api/comments';
import { useParams, Link } from 'react-router-dom';
import './PostDetails.scss';
import CommentSection from '../../components/CommentSection/CommentSection';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = async (postId: number) => {
    fetchCommentsFromPostId(postId)
      .then(setComments)
      .catch((err) => {
        console.error('Error loading comments', err);
      });
  };

  useEffect(() => {
    if (id) {
      const postId = Number(id);
      if (!isNaN(postId)) {
        fetchPostById(postId)
          .then(setPost)
          .catch((err) => {
            console.error('Error loading post', err);
          });
        loadComments(postId);
      }
    }
  }, [id]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <>
      <div className="post-details flex-container">
        <Link to="/" className="nav-link">
          Back
        </Link>
        <p className="date">
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
            .format(new Date(post.createdAt))
            .toUpperCase()}
        </p>

        <h1>{post.title}</h1>
        <p className="paragraph">{post.content}</p>
        <img src={post.previewImage} alt="Preview image" />
      </div>
      <CommentSection
        comments={comments}
        postId={Number(id)}
        loadComments={loadComments}
      ></CommentSection>
    </>
  );
};

export default PostDetails;
