import { mockPostService } from './mockPostService';
import { mockUserService } from './mockUserService';

export const mockHttpService = {
  get,
  post,
  put,
  delete: deleteRequest,
};

// GET method
function get(endpoint, data) {
  if (endpoint === 'post') {
    return mockPostService.getPosts();
  }

  if (endpoint.startsWith('post/')) {
    const postId = endpoint.split('/')[1];
    return mockPostService.getPostById(postId);
  }

  if (endpoint === 'user') {
    return mockUserService.getUsers();
  }

  if (endpoint.startsWith('user/')) {
    const userId = endpoint.split('/')[1];
    return mockUserService.getUserById(userId);
  }

  return Promise.reject('Invalid endpoint');
}

// POST method (create post or user, login)
function post(endpoint, data) {
  if (endpoint === 'post') {
    return mockPostService.createPost(data);
  }

  if (endpoint === 'user') {
    return mockUserService.createUser(data);
  }

  if (endpoint === 'auth/login') {
    return mockUserService.loginUser(data);
  }

  return Promise.reject('Invalid endpoint');
}

// PUT method (update post or user)
function put(endpoint, data) {
  if (endpoint.startsWith('post/')) {
    const postId = endpoint.split('/')[1];
    return mockPostService.updatePost(postId, data);
  }

  if (endpoint.startsWith('user/')) {
    const userId = endpoint.split('/')[1];
    return mockUserService.updateUser(userId, data);
  }

  return Promise.reject('Invalid endpoint');
}

// DELETE method (delete post or user)
function deleteRequest(endpoint) {
  if (endpoint.startsWith('post/')) {
    const postId = endpoint.split('/')[1];
    return mockPostService.deletePost(postId);
  }

  if (endpoint.startsWith('user/')) {
    const userId = endpoint.split('/')[1];
    return mockUserService.deleteUser(userId);
  }

  return Promise.reject('Invalid endpoint');
}
