'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Channels', [
      {
        email: 'channelsatu@gmail.com',
        password:
          '$2b$12$ZuENra6CNSJoWBOO7N01/OEqVavpwby18K1ugCKVbmngBNNH9KfYO',
        channelName: 'Jerome Polin',
        description:
          'Jerome Polin Sijabat (lahir di Jakarta, 2 Mei 1998; umur 22 tahun), atau lebih dikenal sebagai Jerome Polin, adalah seorang YouTuber dan selebriti internet berkebangsaan Indonesia. Ia dikenal setelah memulai kanal YouTube bernama Nihongo Mantappu yang membagikan kehidupan pribadinya di Jepang. Ia sering membuat vlog cara belajar bahasa Jepang, matematika, dan kesehariannya di Jepang dengan cara mengedukasi dan diselipkan dengan komedi.[1] Saat ini, ia masih menimba ilmu di Universitas Waseda, Jepang program studi matematika terapan.[2] Selain menjadi seorang YouTuber, Jerome juga menjadi penulis buku Mantappu Jiwa yang telah diterbitkan pada Agustus 2019.',
        thumbnail:
          'https://res.cloudinary.com/milyas/image/upload/v1608656138/uploads/images/1608656131039%20-%201%20thumbnail.png.png',
        photo:
          'https://res.cloudinary.com/milyas/image/upload/v1608656140/uploads/images/1608656136307%20-%201%20photo.jpeg.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
