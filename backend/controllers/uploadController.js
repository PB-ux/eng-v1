const uuid = require('uuid');
const path = require('path');

const { User } = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require("jsonwebtoken");

const generateJwt = (id, firstName, lastName, photo, level, points, email, role) => {
    return jwt.sign({ id, firstName, lastName, photo, level, points, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
}

class UploadController {
    async uploadUserPhoto(req, res, next) {
        try {
            const { id } = req.user;
            const { file } = req.files;
            const fileName = uuid.v4() + ".jpg";

            file.mv(path.resolve(__dirname, '..', 'static', fileName));

            await User.update({ photo: fileName }, { where: { id: id } });
            const candidate = await User.findOne({ where: { id } });

            const token = generateJwt(candidate.id, candidate.firstName, candidate.lastName, candidate.photo, candidate.level, candidate.points, candidate.email, candidate.role);

            return res.json({ token });
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }

    }
}

module.exports = new UploadController();