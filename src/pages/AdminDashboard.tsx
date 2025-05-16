import { fetchAllPosts, updatePost, deletePost, createPost } from '../api/posts';
import { useState, useEffect } from 'react';
import type { Post, Comment } from '../types';
import { useAuth } from '../context/AuthContext';
import EditableTable from '../components/EditableTable/EditableTable';
import { fetchComments, deleteComment } from '../api/comments';

const AdminDashboard = () => {
  const { id } = useAuth();
  const [posts, setPosts] = useState<Post[] | null>([]);
  const [comments, setComments] = useState<Comment[] | null>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    previewImage: '',
    content: '',
    createdAt: new Date().toISOString(),
    published: false,
    authorId: id ?? -1,
  });

  const loadPosts = () => {
    fetchAllPosts()
      .then(setPosts)
      .catch((err) => {
        console.error('Error loading posts', err);
      });
  };

  const loadComments = () => {
    fetchComments()
      .then(setComments)
      .catch((err) => {
        console.error('Error loading comments', err);
      });
  };

  useEffect(() => {
    loadPosts();
    loadComments();
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

  const handleCreatePost = async () => {
    try {
      const postToCreate = { ...newPost, authorId: id };
      await createPost(postToCreate);
    } catch (err) {
      console.error('Failed to create post', err);
      alert('Failed to create post');
    }
    loadPosts();
  };

  if (!posts) {
    return <div>Loading posts...</div>;
  }

  if (!comments) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <EditableTable<Post>
        fields={['id', 'title', 'previewImage', 'content', 'createdAt', 'authorId', 'published']}
        values={[...posts, { ...newPost, id: -1 }]}
        typeName="Posts"
        handleDelete={async (post) => {
          await deletePost(post);
          loadPosts();
        }}
        handleInputChange={handleInputChange}
        handleSave={updatePost}
        handleCreate={handleCreatePost}
      ></EditableTable>
      <EditableTable<Comment>
        fields={['id', 'text', 'postId', 'authorId', 'createdAt']}
        values={comments}
        typeName="Comments"
        handleDelete={async (comment) => {
          await deleteComment(comment);
          loadComments();
        }}
      ></EditableTable>
    </div>
  );
};

export default AdminDashboard;
