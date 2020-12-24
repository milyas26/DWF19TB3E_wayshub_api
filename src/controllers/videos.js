const Joi = require('joi')
const { Channel, Video, Comment } = require('../../models')
const fs = require('fs')
const path = require('path')

// GET ALL VIDEOS
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      attributes: {
        exclude: ['updatedAt', 'channelId', 'ChannelId'],
      },
      include: [
        {
          model: Channel,
          as: 'channel',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'password',
              'thumbnail',
              'email',
              'description',
            ],
          },
        },
        {
          model: Comment,
          as: 'comments',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'videoId',
              'channelId',
              'VideoId',
              'ChannelId',
            ],
          },
        },
      ],
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
      include: [
        {
          model: Channel,
          as: 'channel',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: Comment,
          as: 'comments',
          attributes: {
            exclude: [
              'updatedAt',
              'channelId',
              'ChannelId',
              'VideoId',
              'videoId',
            ],
          },
          include: {
            model: Channel,
            as: 'channel',
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'password',
                'email',
                'description',
                'thumbnail',
              ],
            },
          },
        },
      ],
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
    const { title, description } = req.body
    const { id: channelId } = req.channelId
    const { files } = req

    const thumbnailName = files.thumbnail[0].path
    const videoName = files.video[0].path

    const schema = Joi.object({
      title: Joi.string().min(8),
      description: Joi.string().min(20),
    })

    const { error } = schema.validate(
      {
        title,
        description,
      },
      { abortEarly: false },
    )

    if (error) {
      return res.status(400).send({
        status: 'Validation Error',
        error: {
          message: error.details.map((error) => error.message),
        },
      })
    }

    const videoAfterCreate = await Video.create({
      title: title,
      thumbnail: thumbnailName,
      description: description,
      video: videoName,
      channelId: channelId,
      viewcount: 0,
    })

    const video = await Video.findOne({
      where: {
        id: videoAfterCreate.id,
      },
      attributes: {
        exclude: ['updatedAt', 'channelId', 'ChannelId'],
      },
      include: [
        {
          model: Channel,
          as: 'channel',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: Comment,
          as: 'comments',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'channelId',
              'ChannelId',
              'VideoId',
              'videoId',
            ],
          },
        },
      ],
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
    const { id: channelId } = req.channelId
    const { body } = req
    const { files } = req

    const thumbnailName = files.thumbnail[0].path
    const videoName = files.video[0].path

    const thisVideo = await Video.findOne({
      where: {
        id,
      },
    })

    await Video.update(
      {
        ...body,
        title: body.title,
        thumbnail: thumbnailName,
        description: body.description,
        video: videoName,
        channelId: channelId,
      },
      {
        where: {
          id,
        },
      },
    )

    const videoAfterUpdate = await Video.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['updatedAt', 'channelId', 'ChannelId'],
      },
      include: [
        {
          model: Channel,
          as: 'channel',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: Comment,
          as: 'comments',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'channelId',
              'ChannelId',
              'VideoId',
              'videoId',
            ],
          },
        },
      ],
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

// INCREASEVIEW
exports.increaseView = async (req, res) => {
  try {
    const { id } = req.params

    const viewCount = await Video.findOne({
      where: {
        id,
      },
    })

    await viewCount.update(
      {
        viewcount: viewCount.viewcount + 1,
      },
      {
        where: {
          id,
        },
      },
    )

    const video = await Video.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['channelId', 'ChannelId'],
      },
    })

    res.send({
      status: 'Success',
      message: 'Video viewcount++',
      data: { video },
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

const deleteFile = (fileName) => {
  const destinationPath = path.resolve(__dirname, '../../')

  if (fileName === 'uploads\\images\\default-photo.png') {
    console.log(true)
    return
  }

  if (fileName === 'uploads\\images\\default-thumbnail.png') {
    console.log(true)
    return
  }

  if (fs.existsSync(`${destinationPath}/${fileName}`)) {
    fs.unlink(`${destinationPath}/${fileName}`, (err) => {
      if (err) {
        console.log(err)
        return
      }

      console.log('delete file')
    })
  } else {
    return
  }
}
