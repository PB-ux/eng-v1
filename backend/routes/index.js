const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const categoryRouter = require('./categoryRouter');
const authorRouter = require('./authorRouter');
const levelRouter = require('./levelRouter');
const theoryRouter = require('./theoryRouter');
const exerciseRouter = require('./exerciseRouter');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/level', levelRouter);
router.use('/theory', theoryRouter);
router.use('/exercise', exerciseRouter);

module.exports = router;