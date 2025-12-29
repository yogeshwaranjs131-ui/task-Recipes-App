// models/Recipe.js - Mongoose Recipe Schema
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipe name is required'],
      trim: true,
      minlength: [3, 'Recipe name must be at least 3 characters long'],
      maxlength: [100, 'Recipe name must not exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must not exceed 500 characters'],
    },
    ingredients: [
      {
        item: {
          type: String,
          required: [true, 'Ingredient item is required'],
          trim: true,
        },
        quantity: {
          type: Number,
          required: [true, 'Ingredient quantity is required'],
          min: [0.1, 'Quantity must be greater than 0'],
        },
        unit: {
          type: String,
          required: [true, 'Ingredient unit is required'],
          enum: ['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'piece', 'pieces'],
        },
      },
    ],
    instructions: [
      {
        step: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: [true, 'Instruction description is required'],
          trim: true,
        },
      },
    ],
    prepTime: {
      type: Number,
      required: [true, 'Preparation time is required'],
      min: [1, 'Prep time must be at least 1 minute'],
      default: 15,
    },
    cookTime: {
      type: Number,
      required: [true, 'Cook time is required'],
      min: [1, 'Cook time must be at least 1 minute'],
      default: 30,
    },
    servings: {
      type: Number,
      required: [true, 'Number of servings is required'],
      min: [1, 'Servings must be at least 1'],
      default: 4,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    cuisine: {
      type: String,
      trim: true,
      default: 'International',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to update the updatedAt timestamp
recipeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema);
