const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  photo: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  level: { type: DataTypes.STRING, defaultValue: 'A1' },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  role: { type: DataTypes.STRING, defaultValue: 'ADMIN' },
});

const Book = sequelize.define('book', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  level: { type: DataTypes.STRING },
  cover: { type: DataTypes.STRING },
  file: { type: DataTypes.STRING },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING }
});

const Author = sequelize.define('author', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: { type: DataTypes.STRING },
});

const Level = sequelize.define('level', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
})

const BookCategory = sequelize.define('book_categories', {});

const BookAuthor = sequelize.define( 'book_authors', {});

const BookLevel = sequelize.define('book_levels', {});

Book.belongsToMany(Category, { through: BookCategory, as: 'categories', foreignKey: 'category_id' });
Category.belongsToMany(Book, { through: BookCategory, as: 'books', foreignKey: 'book_id' });

Book.belongsToMany(Author, { through: BookAuthor, as: 'authors', foreignKey: 'author_id' });
Author.belongsToMany(Book, { through: BookAuthor, as: 'books', foreignKey: 'book_id' });

Book.belongsToMany(Level, { through: BookLevel, as: 'levels', foreignKey: 'level_id' });
Level.belongsToMany(Book, { through: BookLevel, as: 'books', foreignKey: 'book_id' });

module.exports = {
  User,
  Book,
  Category,
  Author,
  BookCategory,
  Level
}