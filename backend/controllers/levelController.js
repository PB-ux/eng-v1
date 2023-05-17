const { Level } = require('../models/models');

class LevelController {
    async create(req, res) {
        const { title } = req.body;

        const level = await Level.create({ title });

        return res.json({ level });
    }

    async getAll(req, res) {
        const levels = await Level.findAll();

        return res.json({ levels });
    }

    async getOne(req, res) {
        const { id } = req.params;

        const level = Level.findByPk(id);

        return res.json({ level });
    }

}

module.exports = new LevelController();
