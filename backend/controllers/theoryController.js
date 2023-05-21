const { Theory, Level, Exercise, Book, Category, Author} = require('../models/models');

class TheoryController {
    async create(req, res) {
        const { title, description, levelId, exerciseId } = req.body;

        const theory = await Theory.create({ title, description, levelId, exerciseId });

        return res.json({ theory });
    }

    async update(req, res) {
        const { title, description, levelId, exerciseId } = req.body;
        const { id } = req.params;

        try {
            await Theory.update({ title, description, levelId, exerciseId }, { where: { id } });
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
                exclude: ['levelId', 'exerciseId'],
            },
            include: [
                {
                model: Level,
                attributes: ['id', 'title'],
                },
                {
                    model: Exercise,
                }
            ]
        })

        return res.json({ theories });
    }

    async getOne(req, res) {
        const { id } = req.params;

        const theory = await Theory.findByPk(id, {
            attributes: {
                exclude: ['levelId', 'exerciseId'],
            },
            include: [
                {
                    model: Level,
                    attributes: ['id', 'title'],
                },
                {
                    model: Exercise,
                }
            ]
        });

        return res.json({ theory });
    }

    async getLevelTheory(req, res) {
        const { levelTitle } = req.body;
        const newTheories = [];

        await Theory.findAll({
            attributes: {
                exclude: ['levelId', 'exerciseId'],
            },
            include: [
                {
                    model: Level,
                    attributes: ['id', 'title'],
                },
                {
                    model: Exercise,
                }
            ]
        }).then((theories) => {
            for(let theory of theories) {
                if (theory.level.title === levelTitle) {
                    newTheories.push(theory);
                }
            }
        })


        return res.json({ theories: newTheories });
    }

}

module.exports = new TheoryController();
