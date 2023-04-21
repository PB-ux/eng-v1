const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.get('/auth', authMiddleware, userController.check);
router.post('/uploadPhoto', authMiddleware, uploadController.uploadUserPhoto);

module.exports = router;