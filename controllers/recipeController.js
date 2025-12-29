// controllers/recipeController.js - CRUD operations for recipes
const Recipe = require('../models/Recipe');
const { validationResult } = require('express-validator');

// CREATE - Add a new recipe
exports.createRecipe = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, description, ingredients, instructions, prepTime, cookTime, servings, difficulty, cuisine, tags, rating } = req.body;

    // Create new recipe
    const newRecipe = new Recipe({
      name,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      cuisine,
      tags,
      rating,
    });

    // Save recipe to database
    const savedRecipe = await newRecipe.save();

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: savedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating recipe',
      error: error.message,
    });
  }
};

// READ - Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    // Optional: Add pagination query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalRecipes = await Recipe.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Recipes retrieved successfully',
      totalRecipes,
      currentPage: page,
      totalPages: Math.ceil(totalRecipes / limit),
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving recipes',
      error: error.message,
    });
  }
};

// READ - Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format',
      });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe retrieved successfully',
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving recipe',
      error: error.message,
    });
  }
};

// UPDATE - Update a recipe by ID
exports.updateRecipe = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const updateData = req.body;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format',
      });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    // Update only provided fields
    Object.keys(updateData).forEach((key) => {
      recipe[key] = updateData[key];
    });

    const updatedRecipe = await recipe.save();

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating recipe',
      error: error.message,
    });
  }
};

// DELETE - Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipe ID format',
      });
    }

    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting recipe',
      error: error.message,
    });
  }
};

// BONUS - Search recipes by cuisine or tags
exports.searchRecipes = async (req, res) => {
  try {
    const { cuisine, tags } = req.query;
    let filter = {};

    if (cuisine) {
      filter.cuisine = { $regex: cuisine, $options: 'i' };
    }

    if (tags) {
      filter.tags = { $in: [tags] };
    }

    const recipes = await Recipe.find(filter);

    res.status(200).json({
      success: true,
      message: 'Recipes searched successfully',
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching recipes',
      error: error.message,
    });
  }
};
