const { Book, Category, Author} = require('../models/models');

class CategoryController {
    async create(req, res) {
        const { title } = req.body;
        const category = await Category.create({ title });

        return res.json({ category });
    }

    async update(req, res) {
        const { title } = req.body;
        const { id } = req.params;

        await Category.update({ title }, { where: { id } });

        return res.json({message: 'Обноление прошло успешно'})
    }

    async delete(req, res) {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        const books = await category.getBooks();
        category.removeBooks(books);

        await Category.destroy({ where: {id} });


        res.json({ message: 'Удаление прошло успешно'});
    }

    async getAll(req, res) {
        const allCategory = await Category.findAll({
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

        return res.json({ categories: allCategory });
    }

    async getCategories(req, res) {
        const allCategory = await Category.findAll()

        return res.json({ categories: allCategory });
    }

    async getOne(req, res) {
        const { id } = req.params;
        const category = await Category.findByPk(id, {
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

        return res.json({ category });
    }

    async getCategoryBook(req, res) {
        const { titleCategory } = req.body;
        const category = await Category.findAll({
            where: { title: titleCategory },
            include: [
                {
                    model: Book,
                    as: 'books',
                    attributes: ['id', 'title', 'description', 'level', 'cover', 'file'],
                    through: {
                        attributes: [],
                    },
                    include: [
                        {
                            model: Author,
                            as: 'authors',
                            attributes: ['id', 'fullName'],
                            through: {
                                attributes: [],
                            }
                        }
                    ]
                }
            ]
        });

        return res.json({ category });
    }

    async writeBook(req, res) {
        const { id, bookId } = req.body;
        const category = await Category.findByPk(id);

        if (!category) return res.json({ message: 'Category not found!' });

        const book = await Book.findByPk(bookId);

        if (!book) res.json({ message: 'Book not found!' });

        await category.addBook(book);

        console.log(`>> added Book id=${book.id} to Category id=${category.id}`)

        return res.json({ category });
    }
}

module.exports = new CategoryController();
