// routes/recipeRoutes.js - Recipe API routes
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { validateRecipeCreation, validateRecipeUpdate, handleValidationErrors } = require('../middleware/validation');

/**
 * @route   POST /api/recipes
 * @desc    Create a new recipe
 * @access  Public
 */
router.post('/', validateRecipeCreation, handleValidationErrors, recipeController.createRecipe);

/**
 * @route   GET /api/recipes
 * @desc    Get all recipes with pagination
 * @access  Public
 */
router.get('/', recipeController.getAllRecipes);

/**
 * @route   GET /api/recipes/search
 * @desc    Search recipes by cuisine or tags
 * @access  Public
 */
router.get('/search', recipeController.searchRecipes);

/**
 * @route   GET /api/recipes/:id
 * @desc    Get a single recipe by ID
 * @access  Public
 */
router.get('/:id', recipeController.getRecipeById);

/**
 * @route   PUT /api/recipes/:id
 * @desc    Update a recipe by ID
 * @access  Public
 */
router.put('/:id', validateRecipeUpdate, handleValidationErrors, recipeController.updateRecipe);

/**
 * @route   DELETE /api/recipes/:id
 * @desc    Delete a recipe by ID
 * @access  Public
 */
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
