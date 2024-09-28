import {
  Activity,
  Chat,
  Comment,
  FilterByPosts,
  Login,
  Post,
  User,
  UserCredentials,
} from 'types';
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
function get(endpoint: 'post', filterBy: FilterByPosts): Promise<Post[]>;
function get(endpoint: `post/${string}`, filterBy: any): Promise<number>;
function get(endpoint: `post/${string}`): Promise<Post>;
function get(endpoint: 'user'): Promise<User[]>;
function get(endpoint: 'user', filterBy: any): Promise<User[]>;
function get(endpoint: `user/${string}`): Promise<User>;
function get(endpoint: 'chat', filterBy?: any): Promise<Chat[]>;
function get(endpoint: 'comment', filterBy: any): Promise<Comment[]>;
function get(endpoint: 'comment'): Promise<Comment[]>;
function get(endpoint: `comment/${string}`): Promise<Comment>;
function get(endpoint: 'activity', filterBy?: any): Promise<Activity[]>;
function get(endpoint: `activity/${string}`, filterBy: any): Promise<number>;

function get(endpoint: string, filterBy?: any): Promise<any> {
  if (endpoint === 'post') {
    return mockPostService.getPosts().then((posts) => {
      if (filterBy as FilterByPosts) {
        const filterByPosts = filterBy as FilterByPosts;
        if (filterByPosts.sortBy) {
          posts = posts.sort((a: Post, b: Post) => {
            const field = filterBy.sortBy;
            if (field === 'date-oldest') {
              const sort = 'createdAt';
              if (a[sort] < b[sort]) return -1;
              if (a[sort] > b[sort]) return 1;
            }
            if (field === 'date-newest') {
              const sort = 'createdAt';
              if (a[sort] < b[sort]) return 1;
              if (a[sort] > b[sort]) return -1;
            }
            return 0;
          });
        }

        if (filterBy.filter) {
          // Apply filtering based on some criteria
          // posts = posts.filter((post: Post) => {
          //   return post.category === filterBy.filter;
          // });
        }
      }
      return posts;
    });
  }

  if (endpoint === 'post/length') {
    return mockPostService.getPosts().then((posts) => posts.length);
  }

  if (endpoint.startsWith(`post/`)) {
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

  // Handle missing cases
  if (endpoint.startsWith('comment')) {
    // Implement logic for comments
  }

  if (endpoint.startsWith('chat')) {
    // Implement logic for chat
  }

  if (endpoint.startsWith('activity')) {
    // Implement logic for activity
  }

  return Promise.reject('Invalid endpoint');
}

// POST method overloads
function post<T>(endpoint: 'post', data: Partial<Post>): Promise<Post>;
function post<T>(endpoint: 'user', data: Partial<User>): Promise<User>;
function post<T>(endpoint: 'auth/login', data: UserCredentials): Promise<User>;
function post<T>(endpoint: 'auth/signup', data: UserCredentials): Promise<User>;
function post<T>(endpoint: 'auth/logout', data: UserCredentials): Promise<User>;
function post<T>(endpoint: 'comment', data: Partial<Comment>): Promise<Comment>;
function post<T>(
  endpoint: 'activity',
  data: Partial<Activity>
): Promise<Activity>;
function post<T>(endpoint: 'chat', data: Partial<Chat>): Promise<Chat>;

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

  // Handle missing cases
  if (endpoint.startsWith('auth/signup')) {
    // Implement logic for signup
  }

  return Promise.reject('Invalid endpoint');
}

// PUT method overloads
function put<T>(
  endpoint: 'post' | `post/${string}`,
  data: Partial<Post>
): Promise<Post>;
function put<T>(
  endpoint: 'user' | `user/${string}`,
  data: Partial<User>
): Promise<User>;
function put<T>(
  endpoint: 'chat' | `chat/${string}`,
  data: Partial<Chat>
): Promise<Chat>;
function put<T>(
  endpoint: 'activity' | `activity/${string}`,
  data: Partial<Activity>
): Promise<Activity>;
function put<T>(
  endpoint: 'comment' | `comment/${string}`,
  data: Partial<Comment>
): Promise<Comment>;
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

// DELETE method overloads
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
