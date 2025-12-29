// server.js - Main Express server file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Recipes App API',
    version: '1.0.0',
    endpoints: {
      create: 'POST /api/recipes',
      getAll: 'GET /api/recipes',
      getById: 'GET /api/recipes/:id',
      update: 'PUT /api/recipes/:id',
      delete: 'DELETE /api/recipes/:id',
      search: 'GET /api/recipes/search?cuisine=Italian&tags=vegetarian',
    },
  });
});

// API Routes
app.use('/api/recipes', recipeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('API Documentation available at the root endpoint');
});

module.exports = app;
