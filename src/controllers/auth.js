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

    const checkEmail = await Channel.findOne({
      where: {
        email,
      },
    })

    if (checkEmail) {
      return res.status(400).send({
        status: 'Failed',
        message: `This email already existed!`,
      })
    }

    const newChannel = await Channel.create({
      email,
      password: passwordHashed,
      channelName,
      description,
      thumbnail: 'thumbnail.jpg',
      photo: 'photo.jpg',
    })

    const PrivateKey = 'TR4NSF0RMER'
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
          email: channel.email,
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

    const { error } = schema.validate(
      {
        email,
        password,
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

    const channel = await Channel.findOne({
      where: {
        email,
      },
    })

    if (!channel) {
      return res.send({
        message: `Invalid Login!`,
      })
    }

    const validPassword = await bcrypt.compare(password, channel.password)

    if (!validPassword) {
      return res.send({
        message: `Invalid Login!`,
      })
    }

    const PrivateKey = 'TR4NSF0RMER'
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
          email: channel.email,
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
