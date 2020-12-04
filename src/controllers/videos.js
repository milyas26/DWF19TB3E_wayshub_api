const { Channel, Video } = require('../../models')

// GET ALL VIDEOS
exports.getVideos = async (req, res) => {
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
    console.log(err)
    res.status(500).send({
      error: {
        message: 'Server error',
      },
    })
  }
}

// GET SINGLE VIDEO
exports.getDetailVideo = async (req, res) => {
  try {
    const { id } = req.params

    const video = await Video.findOne({
      where: {
        id,
      },
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

    if (!video) {
      return res.status(404).send({
        status: 'Resource not found',
        message: `Video with id ${id} not found`,
        data: [],
      })
    }

    res.send({
      status: 'Success',
      message: 'Successfully get Video',
      data: {
        video,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: {
        message: 'Server error',
      },
    })
  }
}

// CREATE / ADD VIDEO
exports.addVideo = async (req, res) => {
  try {
    const { body } = req

    const videoAfterCreate = await Video.create({
      title: body.title,
      thumbnail: body.thumbnail,
      description: body.description,
      video: body.video,
      channelId: body.channelId,
      viewcount: 0,
    })

    const video = await Video.findOne({
      where: {
        id: videoAfterCreate.id,
      },
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

    res.send({
      status: 'Success',
      message: 'Successfully add Video',
      data: {
        video,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: {
        message: 'Server error',
      },
    })
  }
}

// EDIT VIDEO
exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req

    const videoId = await Video.findOne({
      where: {
        id,
      },
    })

    if (!videoId) {
      return res.status(404).send({
        status: 'Resource not found',
        message: `Video with id ${id} not found`,
        data: [],
      })
    }

    await Video.update(body, {
      where: {
        id,
      },
    })

    const videoAfterUpdate = await Video.findOne({
      where: {
        id,
      },
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

    res.send({
      status: 'Success',
      message: 'Channel successfully updated',
      data: {
        videoAfterUpdate,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: {
        message: 'Server error',
      },
    })
  }
}

// DELETE VIDEO
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params

    await Video.destroy({
      where: {
        id,
      },
    })

    res.send({
      status: 'Success',
      message: 'Video successfully deleted',
      data: [],
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: {
        message: 'Server error',
      },
    })
  }
}
