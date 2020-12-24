const { Channel, Video, Subscribe, Comment } = require('../../models')

// ADD SUBSCRIPTION
exports.addSubscription = async (req, res) => {
  try {
    const { channelId } = req.params
    const { id } = req.channelId

    if (id === channelId) {
      return res.status(400).send({
        status: 'error',
        error: {
          message: 'Cannot subscribe yourself',
        },
      })
    }

    const checkChannel = await Channel.findOne({
      where: {
        id: channelId,
      },
    })

    if (!checkChannel) {
      return res.status(400).send({
        status: 'Error',
        error: {
          message: 'Channel not found!',
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
          include: [
            {
              model: Channel,
              as: 'channel',
              attributes: {
                exclude: [
                  'createdAt',
                  'updatedAt',
                  'password',
                  'description',
                  'thumbnail',
                  'photo',
                  'email',
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

    let video = []
    for (let i = 0; i < videos.length; i++) {
      for (let k = 0; k < videos[i].length; k++) {
        video.push(videos[i][k])
      }
    }

    res.send({
      status: 'Success',
      data: {
        subscribtion: video,
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

// GET SUBSCRIPTION CHANNEL
exports.subscriptionChannel = async (req, res) => {
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

    res.send({
      status: 'Success',
      data: {
        subscribtion: subscribtion.subscribtion,
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

// GET ID SUBSCRIBER
exports.getIdSubscriber = async (req, res) => {
  try {
    const { id: channelId } = req.channelId
    const { id } = req.params

    const subscriber = await Subscribe.findOne({
      where: {
        subscriberId: channelId,
        channelId: id,
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
    })

    res.send({
      status: 'Success',
      data: {
        subscriber,
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
