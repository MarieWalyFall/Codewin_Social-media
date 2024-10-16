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
import { mockChatService } from './mockChatService';
import { mockActivityService } from './mockActivityService';

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
function get(endpoint: `chat/${string}`, filterBy?: any): Promise<Chat>;
function get(endpoint: 'comment', filterBy: any): Promise<Comment[]>;
function get(endpoint: 'comment'): Promise<Comment[]>;
function get(endpoint: `comment/${string}`): Promise<Comment>;
function get(endpoint: 'activity', filterBy?: any): Promise<Activity[]>;
function get(endpoint: `activity/${string}`, filterBy: any): Promise<number>;
function get(endpoint: 'activity', filterBy?: any): Promise<Activity[]>;
function get(endpoint: `activity/length`, filterBy?: any): Promise<number>;
function get(endpoint: `activity/${string}`): Promise<Activity>;

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
      }
      return posts;
    });
  }

  if (endpoint === 'post/length') {
    return mockPostService.getPosts().then((posts) => posts.length);
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

  if (endpoint === 'chat') {
    return mockChatService.getChats();
  }

  if (endpoint.startsWith('chat/')) {
    const chatId = endpoint.split('/')[1];
    return mockChatService.getChatById(chatId);
  }

  if (endpoint === 'activity') {
    return mockActivityService.getActivities(filterBy);
  }

  if (endpoint === 'activity/length') {
    return mockActivityService.getActivitiesLength(filterBy);
  }

  if (endpoint.startsWith('activity/')) {
    const activityId = endpoint.split('/')[1];
    return mockActivityService.getActivityById(activityId);
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

  if (endpoint === 'auth/signup') {
    return mockUserService.createUser(data) as Promise<T>;
  }

  if (endpoint === 'chat') {
    return mockChatService.createChat(data) as Promise<T>;
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
function deleteRequest(endpoint: 'post', id: string): Promise<void>;
function deleteRequest(endpoint: 'user', id: string): Promise<void>;
function deleteRequest(endpoint: 'chat', id: string): Promise<void>;
function deleteRequest(endpoint: 'comment', id: string): Promise<void>;

function deleteRequest(endpoint: string, id: any): Promise<any> {
  if (endpoint.startsWith('post')) {
    return mockPostService.deletePost(id);
  }

  if (endpoint.startsWith('user')) {
    return mockUserService.deleteUser(id);
  }

  return Promise.reject('Invalid endpoint');
}
