const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');

const { User } = require('../models/models');

const generateJwt = (id, firstName, lastName, photo, level, points, email, role) => {
    return jwt.sign({ id, firstName, lastName, photo, level, points, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
}

class UserController {
    async registration(req, res, next) {
        const { firstName, lastName, email, password } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Неккоретный email или пароль'));
        }

        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ firstName, lastName, email, password: hashPassword });
        const token = generateJwt(user.id, user.firstName, user.lastName, user.photo, user.level, user.points, user.email, user.role);

        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Неккоретный email или пароль'));
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким email не найден'));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'));
        }

        const token = generateJwt(user.id, user.firstName, user.lastName, user.photo, user.levelId, user.points, user.email, user.role);

        return res.json({token});
    }

    async check(req, res, next) {
       const user = req.user;
       const token = generateJwt(user.id, user.firstName, user.lastName, user.photo, user.level, user.points, user.email, user.role);

       return res.json({ token });
    }

    async addPoint(req, res) {
        const { id } = req.user;
        const userPoints = req.user.points;
        const { points } = req.body;

        const totalPoints = userPoints + points;
        await User.update({ points: totalPoints }, { where: { id } })

        const user = await User.findByPk(id);

        const token = generateJwt(user.id, user.firstName, user.lastName, user.photo, user.level, user.points, user.email, user.role);

        return res.json({ token });
    }

}

module.exports = new UserController();