import React from 'react';
import type { Comment } from '../../types';
import './CommentSection.scss';
type CommentSectionProps = {
  comments: Comment[];
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <div className="comment">
          <div className="profile-picture"></div>
          <div className="comment-details">
            <div className="user-details flex-container">
              <p>{comment.author.username}</p>
              {comment.author.isAdmin && <div className="author">Author</div>}
            </div>
            <p>{comment.createdAt}</p>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
