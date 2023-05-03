const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', categoryController.create);
router.delete('/delete/:id', categoryController.delete);
router.patch('/update/:id', categoryController.update);
router.get('/show', categoryController.getAll);
router.get('/all', categoryController.getCategories);
router.get('/:id', categoryController.getOne);
router.post('/foreign', categoryController.writeBook);


module.exports = router;