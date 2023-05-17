const Router = require('express');
const router = new Router();
const exerciseController = require('../controllers/exerciseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', exerciseController.create);
router.patch('/:id', exerciseController.update);
router.delete('/:id', exerciseController.delete);
router.get('/show', exerciseController.getAll);
router.get('/:id', exerciseController.getOne);

module.exports = router;