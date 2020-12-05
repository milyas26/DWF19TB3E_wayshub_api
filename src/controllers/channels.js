// Import model User
const { Channel, Video } = require('../../models')

// GET ALL CHANNELS
exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.findAll({
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
        },
        {
          model: Channel,
          as: 'subscriber',
          attributes: {
            exclude: ['channelId', 'updatedAt', 'ChannelId', 'createdAt'],
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
    const { id } = req.params
    const { body } = req

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

    await Channel.update(body, {
      where: {
        id,
      },
    })

    const channelAfterUpdate = await Channel.findOne({
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
        channelAfterUpdate,
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
