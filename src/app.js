// Import dependencies
import express from 'express';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to your Express.js server!');
});

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express API 👋' });
});

export default app;
