const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  // photo: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  // level: { type: DataTypes.STRING, allowNull: false },
  // points: { type: DataTypes.INTEGER, allowNull: false },
  role: { type: DataTypes.STRING },
})

module.exports = {
  User
}