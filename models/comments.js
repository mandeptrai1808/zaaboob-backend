'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users,posts}) {
      // define association here
      this.belongsTo(posts, {foreignKey: "postId"}),
      this.belongsTo(users, {foreignKey: "userId"})
    }
  }
  comments.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};