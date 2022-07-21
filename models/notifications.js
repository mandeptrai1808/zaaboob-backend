'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
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
  notifications.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    userSendId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};