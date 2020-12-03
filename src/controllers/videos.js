const { Channel, Video } = require('../../models')

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      attributes: {
        exclude: ['updatedAt', 'channelId', 'ChannelId'],
      },
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
    })

    if (videos.length === 0) {
      return res.status(400).send({
        status: 'Resource not found',
        message: "Video doesn't exist",
        data: [],
      })
    }

    res.send({
      status: 'Success',
      data: {
        videos,
      },
    })
  } catch (err) {
    res.status(500).send({
      error: {
        message: 'Server error',
      },
    })
  }
}
