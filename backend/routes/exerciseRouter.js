const Router = require('express');
const router = new Router();
const exerciseController = require('../controllers/exerciseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', exerciseController.create);
router.post('/:id', exerciseController.update);
router.delete('/:id', exerciseController.delete);
router.get('/show', exerciseController.getAll);
router.get('/:id', exerciseController.getOne);
router.post('/current/completed', exerciseController.addCurrentExercise);
router.post('/current/show', exerciseController.getCurrentExercise);



module.exports = router;