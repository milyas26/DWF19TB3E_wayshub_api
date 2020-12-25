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
      },
      {
        email: 'channeldelapan@gmail.com',
        password:
          '$2b$12$lWq2Dh6W38NtsEMIEgFPge.u50pZ52b4vqlDy5JP7ReXPmBL8X6lm',
        channelName: 'Budi Doremi',
        description:
          'Syahbudin Syukur dikenal dengan nama Budi Doremi Hapsah adalah penyanyi solo yang sukses dengan lagu "Do Re Mi" yang telah menyemarakkan blantika musik Indonesia. Budi menyebut genre musiknya sebagai Pop Reggaenerasi, yaitu aliran Pop yang disegarkan dengan sentuhan irama Reggae..',
        thumbnail:
          'https://res.cloudinary.com/milyas/image/upload/v1608880298/uploads/images/1608880294423%20-%204.%20thumbnail.png.png',
        photo:
          'https://res.cloudinary.com/milyas/image/upload/v1608880298/uploads/images/1608880296435%20-%207%20photo.jpg.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'channeltujuh@gmail.com',
        password:
          '$2b$12$plpFFwJfmjizqZrARq8QAO6FUMSM2cLXON2UVrCJDQ1R9vHH7gl4e',
        channelName: 'Korea Reomit',
        description:
          'Marmut Merah Jambu adalah film indonesia tahun 2014 bergenre drama komedi yang dirilis pada 8 Mei 2014 dan dibintangi oleh Christoffer Nelwan, Raditya Dika, Franda, Kamga Mo, Tio Pakusadewo, Dewi Irawan dan Bucek Depp. Film ini diangkat dari novel karya Raditya Dika yang berjudul sama. Korea Reomit (Jang Hansol).',
        thumbnail:
          'https://res.cloudinary.com/milyas/image/upload/v1608656138/uploads/images/1608656131039%20-%201%20thumbnail.png.png',
        photo:
          'https://res.cloudinary.com/milyas/image/upload/v1608656140/uploads/images/1608656136307%20-%201%20photo.jpeg.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'channelduabelas@gmail.com',
        password:
          '$2b$12$abdeRSeuumfiuUsimp/P7O.19OQMtZjfiagd1ZkCH.LE1Tgm/dSjK',
        channelName: 'Kiflyf TV',
        description: 'channel dua belas deskripsi singkat.',
        thumbnail:
          'https://res.cloudinary.com/milyas/image/upload/v1608836329/uploads/images/1608836327786%20-%202%20thumbnail.jpg.jpg',
        photo:
          'https://res.cloudinary.com/milyas/image/upload/v1608836330/uploads/images/1608836327787%20-%202%20photo.jpg.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
