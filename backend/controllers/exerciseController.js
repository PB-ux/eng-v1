const { Exercise, Theory, Level } = require('../models/models');

class ExerciseController {
    async create(req, res) {
        const { title, review, levelId, numberQuestions, questions } = req.body;
        const questionsJson = JSON.parse(questions);

        const exercise = await Exercise.create({ title, review, numberQuestions, questions: questionsJson, levelId });

        return res.json({ exercise });
    }

    async update(req, res) {
        const { title, review, levelId, numberQuestions, questions } = req.body;
        const { id } = req.params;
        const questionsJson = JSON.parse(questions);

        try {
            await Exercise.update({ title, review, numberQuestions, questions: questionsJson, levelId  }, { where: { id } });
        } catch(e) {
            console.log(e);
            return res.json({ message: 'При обновление произошла ошибка' });
        }

        return res.json({ message: 'Операция обновления произошла успешно!'})
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await Exercise.destroy({ where: { id } });
        } catch (e) {
            return res.json({ message: 'Произошла ошибка при попытке удаления' });
        }

        return res.json({ message: 'Упражнения успешно удалено' });
    }

    async getAll(req, res) {
        const exercises = await Exercise.findAll({
            attributes: {
                exclude: 'levelId'
            },
            include: {
                model: Level,
                attributes: ['id', 'title'],
            }
        })

        return res.json({ exercises });
    }

    async getOne(req, res) {
        const { id } = req.params;

        const exercise = await Exercise.findByPk(id, {
            attributes: {
                exclude: 'levelId'
            },
            include: {
                model: Level,
                attributes: ['id', 'title'],
            }
        });

        return res.json({ exercise });
    }

}

module.exports = new ExerciseController();
