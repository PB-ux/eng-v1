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

const Theory = sequelize.define('theory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
})

const Exercise = sequelize.define('exercise', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  review: { type: DataTypes.TEXT },
  numberQuestions: { type: DataTypes.INTEGER },
  questions: { type: DataTypes.ARRAY(DataTypes.JSON) },
})

const CurrentExercises = sequelize.define( 'current_exercises', {
  status: { type: DataTypes.STRING },
});

const BookCategory = sequelize.define('book_categories', {});

const BookAuthor = sequelize.define( 'book_authors', {});

const BookFavorite = sequelize.define( 'favorite_books', {
  status: { type: DataTypes.STRING, defaultValue: 'favorite' }
});

const BookCurrent = sequelize.define('current_books', {
  status: { type: DataTypes.STRING },
});

Book.belongsToMany(Category, { through: BookCategory, as: 'categories', foreignKey: 'category_id' });
Category.belongsToMany(Book, { through: BookCategory, as: 'books', foreignKey: 'book_id' });

Book.belongsToMany(Author, { through: BookAuthor, as: 'authors', foreignKey: 'author_id' });
Author.belongsToMany(Book, { through: BookAuthor, as: 'books', foreignKey: 'book_id' });

Book.belongsToMany(User, { through: BookFavorite, as: 'usersFavorite', foreignKey: 'user_id' });
User.belongsToMany(Book, { through: BookFavorite, as: 'booksFavorite', foreignKey: 'book_id' });

Book.belongsToMany(User, { through: BookCurrent, as: 'usersCurrent', foreignKey: 'user_id' });
User.belongsToMany(Book, { through: BookCurrent, as: 'booksCurrent', foreignKey: 'book_id' });

User.belongsToMany(Exercise, { through: CurrentExercises, as: 'exercise', foreignKey: 'exercise_id' });
Exercise.belongsToMany(User, { through: CurrentExercises, as: 'user', foreignKey: 'user_id' });

Level.hasOne(Book);
Book.belongsTo(Level);

Level.hasOne(Theory);
Theory.belongsTo(Level);

Level.hasOne(Exercise);
Exercise.belongsTo(Level);

Exercise.hasOne(Theory);
Theory.belongsTo(Exercise);


module.exports = {
  User,
  Book,
  Category,
  Author,
  BookCategory,
  Level,
  Theory,
  Exercise,
  BookFavorite
}