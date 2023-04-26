const Router = require('express');
const router = new Router();
const bookController = require('../controllers/bookController');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', bookController.create);
router.get('/show', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post('/foreign', bookController.writeCategory);
router.post('/foreign-author', bookController.writeAuthor);
router.post('/category', categoryController.getCategoryBook);


module.exports = router;