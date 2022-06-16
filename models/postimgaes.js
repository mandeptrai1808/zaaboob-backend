'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postimgaes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({posts}) {
      // define association here
      this.belongsTo(posts, {foreignKey: 'postId'})
    }
  }
  postimgaes.init({
    linkImg: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'postimgaes',
  });
  return postimgaes;
};