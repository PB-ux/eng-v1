const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');

const { User } = require('../models/models');

const generateJwt = (id, firstName, lastName, email, role) => {
    return jwt.sign({ id, firstName, lastName, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
}

class UserController {
    async registration(req, res, next) {
        const { firstName, lastName, email, password, role } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Неккоретный email или пароль'));
        }

        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ firstName, lastName, email, role, password: hashPassword });
        const token = generateJwt(user.id, user.firstName, user.lastName, user.email, user.role);

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

        const token = generateJwt(user.id, user.firstName, user.lastName, user.email, user.role);

        return res.json({token});
    }

    async check(req, res, next) {
       const { id, email, lastName, firstName, role } = req.user;
       const token = generateJwt(id, firstName, lastName, email, role);

       return res.json({ token });
    }
}

module.exports = new UserController();