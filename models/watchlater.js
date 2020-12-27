'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WatchLater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WatchLater.init({
    userId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WatchLater',
  });
  return WatchLater;
};