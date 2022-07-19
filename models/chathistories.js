'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chathistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      this.belongsTo(users, {foreignKey: "userId"})
    }
  }
  chathistories.init({
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chathistories',
  });
  return chathistories;
};