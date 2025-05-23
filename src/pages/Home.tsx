import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';
import type { Post } from '../types';
import PostPreview from '../components/PostPreview/PostPreview';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

const Home = () => {
  const { isLoggedIn } = useAuth();
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
      <div className="welcome-message">
        <h1>LATEST STORIES</h1>
        {!isLoggedIn && (
          <p>
            <Link to="/login" className="nav-link">
              Login
            </Link>{' '}
            to comment on posts on this blog.
          </p>
        )}
      </div>
      {posts.length === 0 ? (
        <LoadingScreen subject={'posts'}></LoadingScreen>
      ) : (
        <div className="grid">
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} idx={post.id}></PostPreview>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
