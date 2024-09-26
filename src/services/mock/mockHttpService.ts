import { Activity, Comment, Login, Post, User, UserCredentials } from 'types';
import { mockPostService } from './mockPostService';
import { mockUserService } from './mockUserService'; 

export const mockHttpService = {
  get,
  post,
  put,
  delete: deleteRequest,
};

// GET method overloads
function get(endpoint: 'post'): Promise<Post[]>;
function get(endpoint: 'post', filterBy: any): Promise<Post[]>;
function get(endpoint: 'user'): Promise<User[]>;
function get(endpoint: 'comment', filterBy: any): Promise<Comment[]>;
function get(endpoint: 'comment'): Promise<Comment[]>;
function get(endpoint: `comment/${string}`): Promise<Comment>;
function get(endpoint: 'user', filterBy: any): Promise<User[]>;
function get(endpoint: `post/${string}`): Promise<Post>;
function get(endpoint: `post/${string}`, filterBy: any): Promise<number>;
function get(endpoint: `user/${string}`): Promise<User>;

function get(endpoint: string, data?: any): Promise<any> {
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

// POST method
function post<T>(endpoint: 'post', data: Partial<Post>): Promise<Post>;
function post<T>(endpoint: 'user', data: Partial<User>): Promise<User>;
function post<T>(endpoint: 'auth/login', data: UserCredentials): Promise<User>;
function post<T>(endpoint: 'auth/signup', data: UserCredentials): Promise<User>;
function post<T>(endpoint: 'auth/logout', data: UserCredentials): Promise<User>;
function post<T>(endpoint: 'comment', data: Partial<Comment>): Promise<Comment>;
function post<T>(endpoint: 'activity', data: Partial<Activity>): Promise<Activity>;

function post<T>(endpoint: string, data: any): Promise<T> {
  if (endpoint === 'post') {
    return mockPostService.createPost(data) as Promise<T>;
  }

  if (endpoint === 'user') {
    return mockUserService.createUser(data) as Promise<T>;
  }

  if (endpoint === 'auth/login') {
    return mockUserService.loginUser(data) as Promise<T>;
  }

  return Promise.reject('Invalid endpoint');
}

// PUT method
function put<T>(endpoint: 'post' | `post/${string}`, data: Partial<Post>): Promise<Post>;
function put<T>(endpoint: 'user'| `user/${string}`, data: Partial<User>): Promise<User>;
function put<T>(endpoint: 'activity'| `activity/${string}`, data: Partial<Activity>): Promise<Activity>;
function put<T>(endpoint: 'comment'| `comment/${string}`, data: Partial<Comment>): Promise<Comment>;
function put<T>(endpoint: string, data: any): Promise<T> {
  if (endpoint.startsWith('post/')) {
    const postId = endpoint.split('/')[1];
    return mockPostService.updatePost(postId, data) as Promise<T>;
  }

  if (endpoint.startsWith('user/')) {
    const userId = endpoint.split('/')[1];
    return mockUserService.updateUser(userId, data) as Promise<T>;
  }

  return Promise.reject('Invalid endpoint');
}

// DELETE method
function deleteRequest(endpoint: 'post', postId: string): Promise<void>;
function deleteRequest(endpoint: 'user', userId: string): Promise<void>;
function deleteRequest(endpoint: 'comment', commentId: string): Promise<void>;


function deleteRequest(endpoint: string, data: any): Promise<any> {
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
