import users from '../../data/users.json'; // Import user data

let usersData = [...users]; // In-memory database for users

export const mockUserService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};

// Get all users
function getUsers() {
  return Promise.resolve(usersData);
}

// Get a single user by ID
function getUserById(userId) {
  const user = usersData.find((u) => u.id === userId);
  return user ? Promise.resolve(user) : Promise.reject('User not found');
}

// Create a new user
function createUser(user) {
  const newUser = {
    ...user,
    id: 'u' + (usersData.length + 1), // Generate new ID
  };
  usersData.push(newUser);
  return Promise.resolve(newUser);
}

// Update an existing user
function updateUser(userId, user) {
  const index = usersData.findIndex((u) => u.id === userId);
  if (index === -1) return Promise.reject('User not found');

  usersData[index] = { ...usersData[index], ...user, updatedAt: new Date().toISOString() };
  return Promise.resolve(usersData[index]);
}

// Delete a user
function deleteUser(userId) {
  const index = usersData.findIndex((u) => u.id === userId);
  if (index === -1) return Promise.reject('User not found');

  usersData.splice(index, 1);
  return Promise.resolve();
}

// Login a user
function loginUser(credentials) {
  const user = usersData.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );
  return user ? Promise.resolve(user) : Promise.reject('Invalid credentials');
}
