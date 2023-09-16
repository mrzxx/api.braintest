const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');
// GET /:lang/categories
router.get('/categories',categoryController.test_response);
router.get('/:lang/categories',categoryController.show_categories_from_lang);

module.exports = router;
