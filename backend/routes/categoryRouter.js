const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', categoryController.create);
router.get('/show', categoryController.getAll);
router.get('/:id', categoryController.getOne);
router.post('/foreign', categoryController.writeBook);


module.exports = router;