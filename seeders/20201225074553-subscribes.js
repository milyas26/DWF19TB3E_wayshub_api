'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subscribes', null, {})
  },
}
