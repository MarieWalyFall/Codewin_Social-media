import { mockHttpService } from 'services/mock/mockHttpService'; // Import the mock service
import { User, UserCredentials } from 'types';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser';

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
};

const usersCache: Record<string, User> = {}; // Cache for users

async function getUsers(filterBy: any = null): Promise<User[]> {
  return await mockHttpService.get('user', filterBy); // Use mock service
}

async function getById(userId: string): Promise<User | null> {
  if (usersCache[userId]) return usersCache[userId];
  const user = await mockHttpService.get(`user/${userId}`); // Use mock service
  usersCache[userId] = user;
  return user;
}

function remove(userId: string): Promise<void> {
  return mockHttpService.delete('user', userId); // Use mock service
}

async function update(user: Partial<User>): Promise<User> {
  const savedUser = await mockHttpService.put(`user/${user.id}`, user); // Use mock service
  if (getLoggedinUser()?.id === savedUser.id) _saveLocalUser(savedUser);
  return savedUser;
}

async function login(userCred: UserCredentials): Promise<User> {
  const user = await mockHttpService.post('auth/login', userCred); // Use mock service
  return _saveLocalUser(user);
}

async function signup(userCred: UserCredentials): Promise<User> {
  const user = await mockHttpService.post('auth/signup', userCred); // Use mock service
  return _saveLocalUser(user);
}

async function logout(): Promise<void> {
  localStorage.clear();
}

function getLoggedinUser(): User | null {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null');
}

function _saveLocalUser(user: User): User {
  localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}
