const Router = require('express');
const router = new Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', bookController.create);
router.get('/show', bookController.getAll);
router.get('/:id', bookController.getOne);
router.delete('/delete/:id', bookController.delete);
router.patch('/update/:id', bookController.update);
router.post('/foreign', bookController.writeCategory);
router.post('/foreign-author', bookController.writeAuthor);
router.post('/category', bookController.getCategoryBook);
router.post('/favorite', bookController.addFavoriteBook);
router.post('/favorite/delete', bookController.deleteFavoriteBook);
router.post('/favorite/show', bookController.getFavoriteBook);
router.post('/current', bookController.addCurrentBook);
router.post('/current/show', authMiddleware, bookController.getCurrentBook);
router.post('/current/completed', bookController.completedCurrentBook);


module.exports = router;