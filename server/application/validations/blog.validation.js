const { body, validationResult } = require('express-validator');

// Validate create blog request
exports.validateCreateBlog = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validate update blog request
exports.validateUpdateBlog = [
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('content').optional().notEmpty().withMessage('Content is required'),
  body('author').optional().notEmpty().withMessage('Author is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
