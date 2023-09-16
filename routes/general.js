const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');
const testdataController = require('../controllers/testdata');
// GET /:lang/categories
router.get('/test',categoryController.test_response);
router.get('/:lang/categories',categoryController.show_categories_from_lang);
router.get('/test/:testid', testdataController.show_test_by_id);
router.get('/answers/:testid', testdataController.check_solved_test_answers);

module.exports = router;
