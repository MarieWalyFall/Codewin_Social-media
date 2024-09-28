import { User } from 'types';

const API_URL = 'http://localhost:3030/users'; // Adjust the port if necessary

export const mockUserService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};

// Get all users
async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

// Get a single user by ID
async function getUserById(userId: string): Promise<User> {
  const response = await fetch(`${API_URL}/${userId}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

// Create a new user
async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user), // No need to generate an ID here
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
}

// Update an existing user
async function updateUser(
  userId: string,
  user: Partial<Omit<User, 'id' | 'createdAt'>>
): Promise<User> {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('User not found or failed to update');
  }

  return response.json();
}

// Delete a user
async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('User not found or failed to delete');
  }
}

// Login a user
async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<User> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch users for login');
  }

  const users: User[] = await response.json();
  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  return user ? Promise.resolve(user) : Promise.reject('Invalid credentials');
}
