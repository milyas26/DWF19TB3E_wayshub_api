'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Videos',
      [
        {
          title: 'Stephanie Poetri - Selfish (Oficial Video)',
          thumbnail:
            'https://res.cloudinary.com/milyas/image/upload/v1608657434/uploads/videos/1608657429845%20-%207%20selfish.jpg.jpg',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          video:
            'https://res.cloudinary.com/milyas/video/upload/v1608657438/uploads/videos/1608657429927%20-%207%20selfish.mp4.mp4',
          viewcount: 40,
          channelId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Rendy Pandugo - MR. SUN (Official Lyric Video.)',
          thumbnail:
            'https://res.cloudinary.com/milyas/image/upload/v1608879176/uploads/videos/1608879171523%20-%208%20mr%20sun.jpg.jpg',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          video:
            'https://res.cloudinary.com/milyas/video/upload/v1608879183/uploads/videos/1608879171613%20-%208%20mr%20sun.mp4.mp4',
          viewcount: 40,
          channelId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Videos', null, {})
  },
}
