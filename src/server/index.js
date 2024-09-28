const express = require('express');
const cors = require('cors');
const { mockPostService } = require('./mockPostService'); // Adjust the path as necessary
const { mockUserService } = require('./mockUserService'); // Adjust the path as necessary

const app = express();
const PORT = 3030;

// Middleware
app.use(cors());
app.use(express.json());

// Define your endpoints based on the mock services
app.get('/api/post', async (req, res) => {
  try {
    const posts = await mockPostService.getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await mockPostService.getPostById(id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.post('/api/post', async (req, res) => {
  const newPost = req.body;
  try {
    const createdPost = await mockPostService.createPost(newPost);
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Add more endpoints for user, comment, etc. following similar patterns
// Example for user
app.get('/api/user', async (req, res) => {
  try {
    const users = await mockUserService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
