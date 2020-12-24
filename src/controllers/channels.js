// Import model User
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { Channel, Video, Comment } = require('../../models')

// GET ALL CHANNELS
exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: [
        {
          model: Video,
          as: 'videos',
          attributes: {
            exclude: ['channelId', 'updatedAt', 'ChannelId'],
          },
        },
        {
          model: Channel,
          as: 'subscriber',
          attributes: {
            exclude: [
              'channelId',
              'updatedAt',
              'ChannelId',
              'createdAt',
              'password',
            ],
          },
        },
      ],
    })

    if (channels.length === 0) {
      return res.status(400).send({
        status: 'Resource not found',
        message: 'No channels found!',
        data: [],
      })
    }

    res.send({
      status: 'Success',
      message: 'Successfully get Channels',
      data: {
        channels,
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

// GET SINGLE CHANNEL
exports.getSingleChannel = async (req, res) => {
  try {
    const { id } = req.params

    const channel = await Channel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Video,
          as: 'videos',
          attributes: {
            exclude: ['channelId', 'updatedAt', 'ChannelId'],
          },
          include: {
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
        },
        {
          model: Channel,
          as: 'subscriber',
          attributes: {
            exclude: [
              'channelId',
              'updatedAt',
              'ChannelId',
              'email',
              'password',
              'description',
              'createdAt',
              'subscribes',
            ],
          },
          includes: {
            model: Channel,
            as: 'subscribes',
            through: {
              attributes: [],
            },
          },
        },
      ],
    })

    if (!channel) {
      return res.status(404).send({
        status: 'Resource not found',
        message: `Channel with id ${id} not found`,
        data: [],
      })
    }

    res.send({
      status: 'Success',
      message: 'Successfully get Channel',
      data: {
        channel,
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

// UPDATE CHANNEL
exports.updateChannel = async (req, res) => {
  try {
    
    const { id } = req.channelId
    const { email, password, channelName, description } = req.body
    const { thumbnail, photo } = req.files

    const thumbnailName = thumbnail[0].path
    const photoName = photo[0].path

    const schema = Joi.object({
      email: Joi.string().email().min(8),
      password: Joi.string().min(8),
      channelName: Joi.string().min(5),
      description: Joi.string().min(20),
    })

    const { error } = schema.validate(
      {
        email,
        password,
        channelName,
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

    const passwordHashed = await bcrypt.hash(password, 12)

    const channelId = await Channel.findOne({
      where: {
        id,
      },
    })

    if (!channelId) {
      return res.status(404).send({
        status: 'Resource not found',
        message: `Channel with id ${id} not found`,
        data: [],
      })
    }

    await Channel.update(
      {
        email,
        password: passwordHashed,
        channelName,
        description,
        thumbnail: thumbnailName,
        photo: photoName,
      },
      {
        where: {
          id,
        },
      },
    )

    const channel = await Channel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    res.send({
      status: 'Success',
      message: 'Channel successfully updated',
      data: {
        channel: {
          email: channel.email,
          channelName: channel.channelName,
          description: channel.description,
          thumbnail: channel.thumbnail,
          photo: channel.photo,
        },
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

// DELETE CHANNEL
exports.deleteChannel = async (req, res) => {
  try {
    const { id } = req.params

    await Channel.destroy({
      where: {
        id,
      },
    })

    res.send({
      status: 'Success',
      message: 'Channel successfully deleted',
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

// RESTORE CHANNEL
// exports.restoreChannel = async (req, res) => {
//   try {
//     const { id } = req.params

//     await Channel.restore({
//       where: {
//         id,
//       },
//     })

//     const channel = await Channel.findOne({
//       where: {
//         id,
//       },
//     })

//     res.send({
//       status: 'Success',
//       message: 'Channel successfully restored',
//       data: {
//         channel,
//       },
//     })
//   } catch (err) {
//     res.status(500).send({
//       error: {
//         message: 'Server error',
//       },
//     })
//   }
// }

// UPDATE CHANNEL
exports.updateChannelNew = async (req, res) => {
  try {
    const { id } = req.channelId
    const { channelName, description } = req.body
    const { thumbnail, photo } = req.files

    const thumbnailName = thumbnail[0].path
    const photoName = photo[0].path

    const schema = Joi.object({
      channelName: Joi.string().min(5),
      description: Joi.string().min(20),
    })

    const { error } = schema.validate(
      {
        channelName,
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

    const channelId = await Channel.findOne({
      where: {
        id,
      },
    })

    if (!channelId) {
      return res.status(404).send({
        status: 'Resource not found',
        message: `Channel with id ${id} not found`,
        data: [],
      })
    }

    await Channel.update(
      {
        channelName,
        description,
        thumbnail: thumbnailName,
        photo: photoName,
      },
      {
        where: {
          id,
        },
      },
    )

    const channel = await Channel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    res.send({
      status: 'Success',
      message: 'Channel successfully updated',
      data: {
        channel: {
          channelName: channel.channelName,
          description: channel.description,
          thumbnail: channel.thumbnail,
          photo: channel.photo,
        },
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
