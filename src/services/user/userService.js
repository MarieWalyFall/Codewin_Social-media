import { mockHttpService } from '../mock/mockHttpService'; // Import the mock service

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

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

const usersCache = {};

async function getUsers(filterBy = null) {
  return await mockHttpService.get('user', filterBy); // Use mock service
}

async function getById(userId) {
  if (usersCache[userId]) return usersCache[userId];
  const user = await mockHttpService.get(`user/${userId}`); // Use mock service
  usersCache[userId] = user;
  return user;
}

function remove(userId) {
  return mockHttpService.delete(`user/${userId}`); // Use mock service
}

async function update(user) {
  const savedUser = await mockHttpService.put(`user/${user._id}`, user); // Use mock service
  if (getLoggedinUser()?._id === savedUser._id) _saveLocalUser(savedUser);
  return savedUser;
}

async function login(userCred) {
  const user = await mockHttpService.post('auth/login', userCred); // Use mock service
  return _saveLocalUser(user);
}

async function signup(userCred) {
  const user = await mockHttpService.post('auth/signup', userCred); // Use mock service
  return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  return await mockHttpService.post('auth/logout'); // Use mock service
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null');
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}
