import posts from '../../data/posts.json'; // Import post data

let postsData = [...posts]; // In-memory database for posts

export const mockPostService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

// Get all posts
function getPosts() {
  return Promise.resolve(postsData);
}

// Get a single post by ID
function getPostById(postId) {
  const post = postsData.find((p) => p.id === postId);
  return post ? Promise.resolve(post) : Promise.reject('Post not found');
}

// Create a new post
function createPost(post) {
  const newPost = {
    ...post,
    id: 'p' + (postsData.length + 1), // Generate new ID
    createdAt: new Date().toISOString(),
  };
  postsData.push(newPost);
  return Promise.resolve(newPost);
}

// Update an existing post
function updatePost(postId, post) {
  const index = postsData.findIndex((p) => p.id === postId);
  if (index === -1) return Promise.reject('Post not found');

  postsData[index] = { ...postsData[index], ...post, updatedAt: new Date().toISOString() };
  return Promise.resolve(postsData[index]);
}

// Delete a post
function deletePost(postId) {
  const index = postsData.findIndex((p) => p.id === postId);
  if (index === -1) return Promise.reject('Post not found');

  postsData.splice(index, 1);
  return Promise.resolve();
}
