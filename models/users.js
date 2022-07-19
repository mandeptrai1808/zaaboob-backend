'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({posts, comments, friends, requestfriend, notifications, chathistories}) {
      // define association here
      this.hasMany(posts, {foreignKey: "userId"}),
      this.hasMany(comments, {foreignKey: 'userId'}),
      this.hasMany(friends, {foreignKey: "userId"}),
      this.hasMany(requestfriend, {foreignKey: "userGet"}),
      this.hasMany(notifications, {foreignKey: "userId"}),
      this.hasMany(chathistories, {foreignKey: "userId"})
    }
  }
  users.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};