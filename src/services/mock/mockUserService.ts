import { User } from 'types';
import users from '../../data/users.json'; // Import user data

let usersData: User[] = [...users]; // In-memory database for users

export const mockUserService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};

// Get all users
function getUsers(): Promise<User[]> {
  return Promise.resolve(usersData);
}

// Get a single user by ID
function getUserById(userId: string): Promise<User> {
  const user = usersData.find((u) => u.id === userId);
  return user ? Promise.resolve(user) : Promise.reject('User not found');
}

// Create a new user
function createUser(user: Omit<User, 'id'>): Promise<User> {
  const newUser: User = {
    ...user,
    id: 'u' + (usersData.length + 1), // Generate new ID
  };
  usersData.push(newUser);
  return Promise.resolve(newUser);
}

// Update an existing user
function updateUser(userId: string, user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
  const index = usersData.findIndex((u) => u.id === userId);
  if (index === -1) return Promise.reject('User not found');

  // Update user data and set updatedAt
  usersData[index] = { ...usersData[index], ...user, updatedAt: new Date().toISOString() };
  return Promise.resolve(usersData[index]);
}

// Delete a user
function deleteUser(userId: string): Promise<void> {
  const index = usersData.findIndex((u) => u.id === userId);
  if (index === -1) return Promise.reject('User not found');

  usersData.splice(index, 1);
  return Promise.resolve();
}

// Login a user
function loginUser(credentials: { email: string; password: string }): Promise<User> {
  const user = usersData.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );
  return user ? Promise.resolve(user) : Promise.reject('Invalid credentials');
}
