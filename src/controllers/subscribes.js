const { Channel, Video, Subscribe } = require('../../models')

// ADD SUBSCRIPTION
exports.addSubscription = async (req, res) => {
  try {
    const { channelId } = req.body

    const subscribe = await Subscribe.create({
      channelId,
      subscriberId: 4,
    })

    const subscribtion = await Channel.findOne({
      where: {
        id: subscribe.subscriberId,
      },
    })

    res.send({
      status: 'Success',
      data: {
        subscribe: {
          channel: {
            id: subscribtion.id,
            email: subscribtion.email,
            channelName: subscribtion.channelName,
            description: subscribtion.description,
            thumbnail: subscribtion.thumbnail,
            photo: subscribtion.photo,
          },
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
    const { id } = req.params

    const subscribe = await Subscribe.destroy({
      where: {
        id,
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
        id,
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
    const subscribe = await Channel.findAll({
      include: [
        {
          model: Channel,
          as: 'subscribtion',
          attributes: {
            exclude: [
              'channelId',
              'updatedAt',
              'ChannelId',
              'createdAt',
              'password',
            ],
          },
          include: {
            model: Video,
            as: 'videos',
            attributes: {
              exclude: ['channelId', 'updatedAt', 'ChannelId'],
            },
          },
        },
      ],
    })

    const subscribing = subscribe.map(
      (subscribing) => subscribing.subscribtion[0],
    )

    res.send({
      status: 'Success',
      data: {
        subscribing,
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
