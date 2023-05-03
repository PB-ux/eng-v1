const uuid = require('uuid');
const path = require('path');
const { Op } = require("sequelize");

const { Book, Category, Author, BookCategory } = require('../models/models');

class BookController {
    async create(req, res) {
        const { title, description, level, categoryId, authorId } = req.body;
        const { cover, file } = req.files;

        const fileNameCover = uuid.v4() + '.jpg';
        const fileNamePdf = uuid.v4() + '.pdf';

        cover.mv(path.resolve(__dirname, '..', 'static/coverBook', fileNameCover));
        file.mv(path.resolve(__dirname, '..', 'static/filePdf', fileNamePdf));

        const book = await Book.create({ title, description, level, cover: fileNameCover, file: fileNamePdf });

        const category = await Category.findByPk(categoryId);

        if (!category) res.json({ message: 'Category not found!' });

        await book.addCategory(category);

        console.log(`>> added Category id=${category.id} to Book id=${book.id}`)

        const author = await Author.findByPk(authorId);

        if (!author) res.json({ message: 'Author not found!' });

        await book.addAuthor(author);

        console.log(`>> added Author id=${author.id} to Book id=${book.id}`)

        return res.json({ book });
    }

    async update(req, res) {
        const { title, description, level, authorId, categoryId } = req.body;
        const { cover, file } = req.files;
        const { id } = req.params;

        const fileNameCover = uuid.v4() + '.jpg';
        const fileNamePdf = uuid.v4() + '.pdf';

        cover.mv(path.resolve(__dirname, '..', 'static/coverBook', fileNameCover));
        file.mv(path.resolve(__dirname, '..', 'static/filePdf', fileNamePdf));

        const book = await Book.findByPk(id);
        const categories = await book.getCategories();

        book.removeCategories(categories);

        const category = await Category.findByPk(categoryId);
        await book.addCategory(category)

        const authors = await book.getAuthors();

        book.removeAuthors(authors);

        const author = await Author.findByPk(authorId);
        await book.addAuthor(author);

        await Book.update({title, description, file: fileNamePdf, cover: fileNameCover, level}, { where: { id } });

        res.json({message: 'Поля обновились успешно'});
    }

    async delete(req, res) {
        const { id } = req.params;

        await Book.destroy({
            where: { id }
        })

        res.json({ message: 'Удаление прошло успешно'});
    }

    async getAll(req, res) {
        const allBook = await Book.findAll({
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'title'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: Author,
                    as: 'authors',
                    attributes: ['id', 'fullName'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });

        return res.json({ books: allBook });
    }

    async getOne(req, res) {
        const { id } = req.params;

        const book = await Book.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'title'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: Author,
                    as: 'authors',
                    attributes: ['id', 'fullName'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });

        return res.json({ book });
    }

    async writeCategory(req, res) {
        const { id, categoryId } = req.body;
        const book = await Book.findByPk(id);

        if (!book) return res.json({ message: 'Book not found!' });

        const category = await Category.findByPk(categoryId);

        if (!category) res.json({ message: 'Category not found!' });

        await book.addCategory(category);

        console.log(`>> added Category id=${category.id} to Book id=${book.id}`)

        return res.json({ book });
    }

    async writeAuthor(req, res) {
        const { id, authorId } = req.body;
        const book = await Book.findByPk(id);

        if (!book) return res.json({ message: 'Book not found!' });

        const author = await Author.findByPk(authorId);

        if (!author) res.json({ message: 'Author not found!' });

        await book.addAuthor(author);

        console.log(`>> added Author id=${author.id} to Book id=${book.id}`)

        return res.json({ book });
    }
}

module.exports = new BookController();
