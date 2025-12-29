// middleware/validation.js - Input validation middleware
const { body, validationResult } = require('express-validator');

// Validation rules for creating a recipe
exports.validateRecipeCreation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Recipe name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Recipe name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  body('ingredients')
    .isArray()
    .withMessage('Ingredients must be an array')
    .custom((value) => {
      if (value.length === 0) {
        throw new Error('At least one ingredient is required');
      }
      return true;
    })
    .custom((value) => {
      for (let ingredient of value) {
        if (!ingredient.item || !ingredient.quantity || !ingredient.unit) {
          throw new Error('Each ingredient must have item, quantity, and unit');
        }
        if (!['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'piece', 'pieces'].includes(ingredient.unit)) {
          throw new Error('Invalid unit. Use: g, kg, ml, l, tbsp, tsp, cup, piece, or pieces');
        }
      }
      return true;
    }),

  body('instructions')
    .isArray()
    .withMessage('Instructions must be an array')
    .custom((value) => {
      if (value.length === 0) {
        throw new Error('At least one instruction is required');
      }
      return true;
    })
    .custom((value) => {
      for (let instruction of value) {
        if (!instruction.step || !instruction.description) {
          throw new Error('Each instruction must have step and description');
        }
      }
      return true;
    }),

  body('prepTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Prep time must be a positive integer'),

  body('cookTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Cook time must be a positive integer'),

  body('servings')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Servings must be a positive integer'),

  body('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be Easy, Medium, or Hard'),

  body('cuisine')
    .optional()
    .trim(),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
];

// Validation rules for updating a recipe
exports.validateRecipeUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Recipe name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  body('prepTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Prep time must be a positive integer'),

  body('cookTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Cook time must be a positive integer'),

  body('servings')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Servings must be a positive integer'),

  body('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be Easy, Medium, or Hard'),

  body('cuisine')
    .optional()
    .trim(),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
];

// Error handler middleware
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }
  next();
};
