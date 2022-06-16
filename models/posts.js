'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, postimgaes, likes, comments}) {
      // define association here
      this.hasMany(postimgaes, {foreignKey: "postId"}),
      this.belongsTo(users, {foreignKey: "userId"}),
      this.hasMany(likes, {foreignKey: 'postId'}),
      this.hasMany(comments, {foreignKey: 'postId'})
    }
  }
  posts.init({
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};