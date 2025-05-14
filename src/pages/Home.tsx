import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';
import type { Post } from '../types';
import PostPreview from '../components/PostPreview/PostPreview';
import { Link } from 'react-router-dom';
const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => {
        console.error('Error loading posts', err);
      });
  }, []);

  return (
    <div className="grid-container">
      <h1>LATEST STORIES</h1>

      <p>
        <Link to="/login" className="nav-link">
          Login
        </Link>{' '}
        to comment on posts on this blog.
      </p>
      <div className="grid">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} idx={post.id}></PostPreview>
        ))}
      </div>
    </div>
  );
};

export default Home;
