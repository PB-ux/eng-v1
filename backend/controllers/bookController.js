const uuid = require('uuid');
const path = require('path');
const { Op } = require("sequelize");

const userController = require('../controllers/userController');

const { Book, Category, Author, Level, User } = require('../models/models');

class BookController {
    async create(req, res) {
        const { title, description, levelId, categoryId, authorId } = req.body;
        const { cover, file } = req.files;

        const fileNameCover = uuid.v4() + '.jpg';
        const fileNamePdf = uuid.v4() + '.pdf';

        cover.mv(path.resolve(__dirname, '..', 'static/coverBook', fileNameCover));
        file.mv(path.resolve(__dirname, '..', 'static/filePdf', fileNamePdf));

        const book = await Book.create({ title, description, cover: fileNameCover, file: fileNamePdf, levelId });

        const category = await Category.findByPk(categoryId);

        if (!category) res.json({ message: 'Category not found!' });

        await book.addCategory(category);

        const author = await Author.findByPk(authorId);

        if (!author) res.json({ message: 'Author not found!' });

        await book.addAuthor(author);

        return res.json({ book });
    }

    async update(req, res) {
        const { title, description, levelId, authorId, categoryId } = req.body;
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

        await Book.update({title, description, file: fileNamePdf, cover: fileNameCover, levelId}, { where: { id } });

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
            attributes: {
                exclude: ['levelId'],
            },
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
                },
                {
                    model: Level,
                    attributes: ['id', 'title']
                }
            ]
        });

        return res.json({ books: allBook });
    }

    async getOne(req, res) {
        const { id } = req.params;

        const book = await Book.findByPk(id, {
            attributes: {
                exclude: ['levelId'],
            },
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
                },
                {
                    model: Level,
                    attributes: ['id', 'title']
                }
            ]
        });

        return res.json({ book });
    }

    async addFavoriteBook(req, res) {
        const { userId, bookId } = req.body;

        const user = await User.findByPk(userId);

        const book = await Book.findByPk(bookId);

        await user.addBooksFavorite(book);

        return res.json({ message: 'Книга добавилась в понравившиеся!'})
    }

    async deleteFavoriteBook(req, res) {
        const { userId, bookId } = req.body;

        const user = await User.findByPk(userId);

        const book = await Book.findByPk(bookId);

        await user.removeBooksFavorite(book);

        return res.json({ message: 'Книга удалена из понравившихся!' });
    }

    async getFavoriteBook(req, res) {
        const { userId } = req.body;

        const user = await User.findByPk(userId, {
            include: {
                model: Book,
                as: 'booksFavorite',
                include: [
                    {
                        model: Level,
                        attributes: ['id', 'title']
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
            }
        });

        return res.json({ user });
    }

    async addCurrentBook(req, res) {
        const { userId, bookId } = req.body;

        const user = await User.findByPk(userId);

        const book = await Book.findByPk(bookId);

        await user.addBooksCurrent(book, { through: { status: 'start'} });

        return res.json({ message: 'Текущая книга пользователя!'})
    }

    async completedCurrentBook(req, res) {
        const { userId, bookId } = req.body;

        const book = await Book.findByPk(bookId);
        const user = await User.findByPk(userId);

        user.removeBooksCurrent(book);

        await user.addBooksCurrent(book, { through: { status: 'completed' }})

        res.json({ message: 'Книга прочтена!' });
    }

    async getCurrentBook(req, res) {
        const { userId } = req.body;

        const user = await User.findByPk(userId, {
            include: {
                model: Book,
                as: 'booksCurrent',
                include: [
                    {
                        model: Level,
                        attributes: ['id', 'title']
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
            }
        });

        return res.json({ user });
    }

    async getCategoryBook(req, res) {
        const { titleCategory } = req.body;
        const newBooks = [];

        await Book.findAll({
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
                },
                {
                    model: Level,
                    attributes: ['id', 'title']
                }
            ]
        }).then((books) => {
            for(let book of books) {
                for(let category of book.categories) {
                    if (category.title === titleCategory) {
                        newBooks.push(book);
                    }
                }
            }
        })


        return res.json({ books: newBooks });
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
