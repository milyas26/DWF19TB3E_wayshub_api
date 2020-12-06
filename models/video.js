'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Video.belongsTo(models.Channel, {
        as: 'channel',
      })
      Video.hasMany(models.Comment, {
        as: 'comments',
      })
    }
  }
  Video.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      description: DataTypes.TEXT,
      video: DataTypes.STRING,
      viewcount: DataTypes.INTEGER,
      channelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Video',
    },
  )
  return Video
}