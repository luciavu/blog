import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';
import type { Post } from '../types';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => console.error('Error loading posts', err));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <img src={post.previewImage} alt="Preview image" />
          <h2>{post.title}</h2>
          <p>{post.content.slice(0, 50)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
