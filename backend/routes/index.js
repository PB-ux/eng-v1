const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const categoryRouter = require('./categoryRouter');
const authorRouter = require('./authorRouter');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/book', bookRouter);
router.use('/author', authorRouter);

module.exports = router;