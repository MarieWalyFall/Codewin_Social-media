import posts from "data/posts.json"; // Import post data
import { Post } from "types";


let postsData: Post[] = [...posts]; // In-memory database for posts

export const mockPostService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

// Get all posts
function getPosts(): Promise<Post[]> {
  return Promise.resolve(postsData);
}

// Get a single post by ID
function getPostById(postId: string): Promise<Post> {
  const post = postsData.find((p) => p.id === postId);
  return post ? Promise.resolve(post) : Promise.reject('Post not found');
}

// Create a new post
function createPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
  const newPost: Post = {
    ...post,
    id: 'p' + (postsData.length + 1), // Generate new ID
    createdAt: new Date().toISOString(),
  };
  postsData.push(newPost);
  return Promise.resolve(newPost);
}

// Update an existing post
function updatePost(postId: string, post: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Post> {
  const index = postsData.findIndex((p) => p.id === postId);
  if (index === -1) return Promise.reject('Post not found');

  postsData[index] = { ...postsData[index], ...post, updatedAt: new Date().toISOString() };
  return Promise.resolve(postsData[index]);
}

// Delete a post
function deletePost(postId: string): Promise<void> {
  const index = postsData.findIndex((p) => p.id === postId);
  if (index === -1) return Promise.reject('Post not found');

  postsData.splice(index, 1);
  return Promise.resolve();
}
