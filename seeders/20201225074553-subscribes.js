'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Subscribes',
      [
        {
          channelId: 7,
          subscriberId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          subscriberId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 4,
          subscriberId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 7,
          subscriberId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 23,
          subscriberId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subscribes', null, {})
  },
}
