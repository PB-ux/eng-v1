const { Theory, Level } = require('../models/models');

class TheoryController {
    async create(req, res) {
        const { title, description, levelId } = req.body;

        const theory = await Theory.create({ title, description, levelId});

        return res.json({ theory });
    }

    async update(req, res) {
        const { title, description, levelId } = req.body;
        const { id } = req.params;

        try {
            await Theory.update({ title, description, levelId }, { where: { id } });
        } catch(e) {
            return res.json({ message: 'При обновление произошла ошибка' });
        }

        return res.json({ message: 'Операция обновления произшла успешно!'})
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await Theory.destroy({ where: { id } });
        } catch (e) {
            return res.json({ message: 'Произошла ошибка при попытке удаления' });
        }

        return res.json({ message: 'Теория успешна удалена' });
    }

    async getAll(req, res) {
        const theories = await Theory.findAll({
            attributes: {
                exclude: 'levelId'
            },
            include: {
                model: Level,
                attributes: ['id', 'title'],
            }
        })

        return res.json({ theories });
    }

    async getOne(req, res) {
        const { id } = req.params;

        const theory = await Theory.findByPk(id, {
            attributes: {
                exclude: 'levelId'
            },
            include: {
                model: Level,
                attributes: ['id', 'title'],
            }
        });

        return res.json({ theory });
    }

}

module.exports = new TheoryController();
