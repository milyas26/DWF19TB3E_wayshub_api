// Import model User
const { Channel } = require('../../models')

// GET ALL CHANNELS
exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
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
    res.status(500).send({
      error: {
        message: 'Server error',
      },
    })
  }
}

// ADD NEW CHANNEL / REGISTER NEW CHANNEL
exports.addChannel = async (req, res) => {
  try {
    const { email, password, channelName, description } = req.body

    const channel = await Channel.create({
      email,
      password,
      channelName,
      description,
      thumbnail: 'thumbnail.jpg',
      photo: 'photo.jpg',
    })

    res.send({
      status: 'Success',
      message: 'Channel successfully created',
      data: {
        channel: {
          email,
          password,
        },
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

// LOGIN CHANNEL
exports.loginChannel = async (req, res) => {
  try {
    const { email, password } = req.body
    const channel = await Channel.findOne({
      where: {
        email,
      },
      attributes: {
        includes: ['email', 'password'],
      },
    })

    if (!channel) {
      return res.send({
        message: `User with email ${email} not found!`,
      })
    }

    res.send({
      status: 'Success',
      message: 'Login Successfully',
      data: {
        channel: {
          email: channel.email,
          channel: channel.password,
        },
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
