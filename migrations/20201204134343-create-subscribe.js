'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscribes', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      channelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Channels',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      subscriberId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Channels',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscribes')
  },
}
