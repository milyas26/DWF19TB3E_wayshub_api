const { Channel, Video, Subscribe } = require('../../models')

// ADD SUBSCRIPTION
exports.addSubscription = async (req, res) => {
  try {
    const { channelId } = req.body
    const { id } = req.channelId

    if (id === channelId) {
      return res.status(400).send({
        status: 'error',
        error: {
          message: 'Cannot subscribe yourself',
        },
      })
    }

    const isSubscribed = await Subscribe.findOne({
      where: {
        channelId: channelId,
        subscriberId: id,
      },
    })

    if (isSubscribed) {
      return res.status(400).send({
        status: 'error',
        error: {
          message: 'Already subscribe to this chanel',
        },
      })
    }

    await Subscribe.create({
      channelId: channelId,
      subscriberId: id,
    })

    const channel = await Channel.findOne({
      where: {
        id: channelId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    })

    res.send({
      status: 'Success',
      data: {
        subscribe: {
          channel,
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

// DELETE SUBSCRIBE
exports.unSubscribe = async (req, res) => {
  try {
    const { channelId } = req.params
    const { id } = req.channelId

    const subscribe = await Subscribe.destroy({
      where: {
        channelId,
        subscriberId: id,
      },
    })

    if (!subscribe) {
      return res.status(404).send({
        status: 'Subscription not found',
      })
    }

    res.send({
      status: 'Success',
      data: {
        id: channelId,
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

// GET SUBSCRIBER
exports.getSubscription = async (req, res) => {
  try {
    const { id } = req.channelId

    const subscribtion = await Channel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'password',
          'chanelName',
          'thumbnail',
          'photo',
          'id',
          'email',
          'description',
        ],
      },
      include: {
        model: Channel,
        as: 'subscribtion',
        through: {
          attributes: [],
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
        include: {
          model: Video,
          as: 'videos',
          attributes: {
            exclude: ['channelId', 'updatedAt', 'ChannelId'],
          },
        },
      },
    })

    if (subscribtion.subscribtion.length === 0) {
      return res.status(400).send({
        status: 'error',
        error: {
          message: "You didn't subscribe anyone",
        },
      })
    }

    const videos = subscribtion.subscribtion.map((video) => video.videos)

    res.send({
      status: 'Success',
      data: {
        // subscribtion: subscribtion.subscribtion,
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
