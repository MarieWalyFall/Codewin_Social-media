import { Post } from 'types';

const API_URL = 'http://localhost:3030/posts'; // Adjust the port if necessary

export const mockPostService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

// Get all posts
async function getPosts(): Promise<Post[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

// Get a single post by ID
async function getPostById(postId: string): Promise<Post> {
  const response = await fetch(`${API_URL}/${postId}`);
  if (!response.ok) {
    throw new Error('Post not found');
  }
  return response.json();
}

// Create a new post
async function createPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...post,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
}

// Update an existing post
async function updatePost(
  postId: string,
  post: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Post> {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...post,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Post not found or failed to update');
  }

  return response.json();
}

// Delete a post
async function deletePost(postId: string): Promise<void> {
  console.log(postId);
  const response = await fetch(`${API_URL}/${postId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Post not found or failed to delete');
  }
}
