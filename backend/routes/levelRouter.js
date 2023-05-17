const Router = require('express');
const router = new Router();
const levelController = require('../controllers/levelController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', levelController.create);
router.get('/show', levelController.getAll);
router.get('/:id', levelController.getOne);


module.exports = router;