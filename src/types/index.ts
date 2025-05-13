export interface Post {
  id: number;
  title: string;
  content: string;
  previewImage: string;
  published: boolean;
  createdAt: string;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  text: string;
  createdAt: string;
}
