import { fetchAllPosts, updatePost, deletePost, createPost } from '../api/posts';
import { useState, useEffect } from 'react';
import type { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import EditableTable from '../components/EditableTable/EditableTable';

const AdminDashboard = () => {
  const { id } = useAuth();

  const [posts, setPosts] = useState<Post[] | null>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    previewImage: '',
    content: '',
    createdAt: new Date().toISOString(),
    published: false,
    authorId: id ?? -1,
  });

  useEffect(() => {
    fetchAllPosts()
      .then(setPosts)
      .catch((err) => {
        console.error('Error loading posts', err);
      });
  }, []);

  const handleInputChange = (id: number, field: keyof Post, value: string | boolean) => {
    if (id === -1) {
      // New post
      setNewPost((prev) => ({ ...prev, [field]: value }));
    } else {
      // Update existing post
      setPosts((prev) =>
        prev!.map((post) => (post.id === id ? { ...post, [field]: value } : post))
      );
    }
  };

  const handleSave = async (post: Post) => {
    try {
      await updatePost(post);
    } catch (err) {
      console.error('Failed to update post', err);
      alert('Failed to update');
    }
  };

  const handleDeletePost = async (post: Post) => {
    try {
      await deletePost(post.id);
    } catch (err) {
      console.error('Failed to delete post', err);
      alert('Failed to delete post');
    }
  };

  const handleCreatePost = async () => {
    try {
      const postToCreate = { ...newPost, authorId: id };
      await createPost(postToCreate);
    } catch (err) {
      console.error('Failed to create post', err);
      alert('Failed to create post');
    }
  };

  if (!posts) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <EditableTable<Post>
        fields={['id', 'title', 'previewImage', 'content', 'createdAt', 'authorId', 'published']}
        values={[...posts, { ...newPost, id: -1 }]}
        typeName="Posts"
        handleDelete={handleDeletePost}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      ></EditableTable>
    </div>
  );
};

export default AdminDashboard;
