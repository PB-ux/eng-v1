const Router = require('express');
const router = new Router();
const theoryController = require('../controllers/theoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', theoryController.create);
router.patch('/:id', theoryController.update);
router.delete('/:id', theoryController.delete);
router.get('/show', theoryController.getAll);
router.get('/:id', theoryController.getOne);
router.post('/level', theoryController.getLevelTheory);

module.exports = router;