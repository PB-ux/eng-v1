const { Book, Author } = require('../models/models');

class AuthorController {
    async create(req, res) {
        const { fullName } = req.body;
        const author = await Author.create({ fullName });

        return res.json({ author });
    }

    async update(req, res) {
        const { fullName } = req.body;
        const { id } = req.params;

        await Author.update({ fullName }, { where: { id } });

        return res.json({message: 'Обноление прошло успешно'})
    }

    async delete(req, res) {
        const { id } = req.params;
        const author = await Author.destroy({ where: id });

        res.json({ message: 'Удаление прошло успешно'});
    }

    async getAll(req, res) {
        const allAuthor = await Author.findAll({
            include: [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['title', 'description', 'level', 'cover', 'file'],
                    through: {
                        attributes: [],
                    },
                }
            ]
        });

        return res.json({ authors: allAuthor });
    }

    async getAuthors(req, res) {
        const allAuthor = await Author.findAll();

        return res.json({ authors: allAuthor });
    }

    async getOne(req, res) {
        const { id } = req.params;
        const author = await Author.findByPk(id, {
            include: [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['title', 'description', 'level', 'cover', 'file'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });

        return res.json({ author });
    }

    async writeBook(req, res) {
        const { id, bookId } = req.body;
        const author = await Author.findByPk(id);

        if (!author) return res.json({ message: 'Author not found!' });

        const book = await Book.findByPk(bookId);

        if (!book) res.json({ message: 'Book not found!' });

        await author.addBook(book);

        console.log(`>> added Book id=${book.id} to Author id=${author.id}`)

        return res.json({ author });
    }
}

module.exports = new AuthorController();
