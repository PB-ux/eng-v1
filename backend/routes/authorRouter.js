const Router = require('express');
const router = new Router();
const authorController = require('../controllers/authorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authorController.create);
router.get('/show', authorController.getAll);
router.get('/all', authorController.getAuthors);
router.get('/:id', authorController.getOne);
router.post('/foreign', authorController.writeBook);


module.exports = router;