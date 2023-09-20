const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');
const testdataController = require('../controllers/testdata');
const userdataController = require('../controllers/userdata');
// GET /:lang/categories
router.get('/:lang/categories',categoryController.show_categories_from_lang);
router.get('/test/:testid', testdataController.show_test_by_id);
router.get('/answers/:testid', testdataController.check_solved_test_answers);
router.post('/test/:testid', testdataController.complete_test);
router.get('/profile', userdataController.get_profile);
router.get('/version', userdataController.get_app_version);
module.exports = router;
