'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Channel.hasMany(models.Video, {
        as: 'videos',
      })
      Channel.hasMany(models.Comment, {
        as: 'comments',
      })

      Channel.belongsToMany(models.Channel, {
        foreignKey: 'channelId',
        otherKey: 'subscriberId',
        as: 'subscriber',
        through: 'subscribes',
      })

      Channel.belongsToMany(models.Channel, {
        foreignKey: 'subscriberId',
        otherKey: 'channelId',
        as: 'subscribtion',
        through: 'subscribes',
      })
    }
  }
  Channel.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      channelName: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      // paranoid: true,
      modelName: 'Channel',
    },
  )
  return Channel
}
