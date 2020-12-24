const Joi = require('joi')
const { Channel } = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// ADD NEW CHANNEL / REGISTER NEW CHANNEL
exports.addChannel = async (req, res) => {
  try {
    const { email, password, channelName, description } = req.body

    const schema = Joi.object({
      email: Joi.string().email().min(8).required(),
      password: Joi.string().min(8).required(),
      channelName: Joi.string().min(5).required(),
      description: Joi.string().min(20).required(),
    })

    const { error } = schema.validate({
      email,
      password,
      channelName,
      description,
    })

    if (error) {
      return res.status(400).send({
        status: 'Validation Error',
        error: {
          message: error.details.map((error) => error.message),
        },
      })
    }

    const passwordHashed = await bcrypt.hash(password, 12)

    const checkEmail = await Channel.findOne({
      where: {
        email,
      },
    })

    if (checkEmail) {
      return res.status(400).send({
        status: 'Failed',
        error: {
          message: `This email already exist!`,
        },
      })
    }

    const newChannel = await Channel.create({
      email,
      password: passwordHashed,
      channelName,
      description,
      thumbnail: 'uploads\\images\\default-thumbnail.png',
      photo: 'uploads\\images\\default-photo.png',
    })

    const PrivateKey = process.env.JWT_PRIVATE_KEY
    const token = jwt.sign(
      {
        id: newChannel.id,
      },
      PrivateKey,
    )

    const channel = await Channel.findOne({
      where: {
        id: newChannel.id,
      },
    })

    res.send({
      status: 'Success',
      message: 'Channel successfully created',
      data: {
        channel: {
          id: channel.id,
          channelName: channel.channelName,
          email: channel.email,
          description: channel.description,
          thumbnail: channel.thumbnail,
          photo: channel.photo,
          token,
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

// LOGIN CHANNEL
exports.loginChannel = async (req, res) => {
  try {
    const { email, password } = req.body

    const schema = Joi.object({
      email: Joi.string().email().min(8).required(),
      password: Joi.string().min(8).required(),
    })

    const { error } = schema.validate({
      email,
      password,
    })

    if (error) {
      return res.status(400).send({
        status: 'Validation Error',
        error: {
          message: error.details.map((error) => error.message),
        },
      })
    }

    const channel = await Channel.findOne({
      where: {
        email,
      },
    })

    if (!channel) {
      return res.status(400).send({
        error: {
          message: `Invalid Login!`,
        },
      })
    }

    const validPassword = await bcrypt.compare(password, channel.password)

    if (!validPassword) {
      return res.status(400).send({
        error: {
          message: `Invalid Login!`,
        },
      })
    }

    const PrivateKey = process.env.JWT_PRIVATE_KEY
    const token = jwt.sign(
      {
        id: channel.id,
      },
      PrivateKey,
    )

    res.send({
      status: 'Success',
      message: 'Login Successfully',
      data: {
        channel: {
          id: channel.id,
          channelName: channel.channelName,
          email: channel.email,
          description: channel.description,
          thumbnail: channel.thumbnail,
          photo: channel.photo,
          token,
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

exports.checkAuth = async (req, res) => {
  try {
    const userId = req.channelId

    const user = await Channel.findOne({
      where: {
        id: userId.id,
      },
      attributes: {
        exclude: ['password'],
      },
    })

    res.send({
      status: 'Success',
      message: 'User Valid',
      data: user,
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

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { id } = req.params
    const { email, password } = req.body

    const schema = Joi.object({
      password: Joi.string().min(8).required(),
    })

    const { error } = schema.validate({
      password,
    })

    if (error) {
      return res.status(400).send({
        status: 'Validation Error',
        error: {
          message: error.details.map((error) => error.message),
        },
      })
    }

    const passwordHashed = await bcrypt.hash(password, 12)
    await Channel.update(
      {
        email,
        password: passwordHashed,
      },
      {
        where: {
          id,
        },
      },
    )

    const channel = await Channel.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    })

    const PrivateKey = process.env.JWT_PRIVATE_KEY
    const token = jwt.sign(
      {
        id: channel.id,
      },
      PrivateKey,
    )

    res.send({
      status: 'Success',
      message: 'Reset Password Successfully',
      data: {
        channel: {
          id: channel.id,
          channelName: channel.channelName,
          email: channel.email,
          description: channel.description,
          thumbnail: channel.thumbnail,
          photo: channel.photo,
          token,
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
