const { Video, WatchLater } = require('../../models')
const { Op } = require('sequelize')

// GET ALL WATCH LATER
exports.getAllWatchLater = async (req, res) => {
  try {
    const { id } = req.channelId
    const listWatch = await WatchLater.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    })

    const videoId = listWatch.map((item) => item.videoId)

    if (listWatch.length === 0) {
      return res.status(400).send({
        status: 'Resource not found',
        message: "List doesn't exist",
        data: [],
      })
    }

    const videos = await Video.findAll({
      where: {
        id: {
          [Op.in]: videoId,
        },
      },
    })

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

// ADD WATCH LATER
exports.addWatchLater = async (req, res) => {
  try {
    const { id: user } = req.channelId
    const { id: video } = req.params

    const listCheck = await WatchLater.findOne({
      where: {
        userId: user,
        videoId: video,
      },
    })

    if (listCheck) {
      return res.status(400).send({
        status: 'error',
        error: {
          message: 'Already added to watch later',
        },
      })
    }

    const addedVideo = await WatchLater.create({
      userId: user,
      videoId: video,
    })

    res.send({
      status: 'Success',
      data: {
        addedVideo,
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

// DELETE WATCH LATER
exports.deleteWatchLater = async (req, res) => {
  try {
    const { id: user } = req.channelId
    const { id: video } = req.params

    const listCheck = await WatchLater.findOne({
      where: {
        userId: user,
        videoId: video,
      },
    })

    if (!listCheck) {
      return res.status(400).send({
        status: 'error',
        error: {
          message: 'This video not in list',
        },
      })
    }

    const deletedList = await WatchLater.destroy({
      where: {
        userId: user,
        videoId: video,
      },
    })

    res.send({
      status: 'Success deleted from list',
      data: {
        id: deletedList,
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

// GET IS IN LIST
exports.getIsInList = async (req, res) => {
  try {
    const { id: user } = req.channelId
    const { id: video } = req.params

    const isInList = await WatchLater.findOne({
      where: {
        userId: user,
        videoId: video,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    res.send({
      status: 'Success',
      data: {
        isInList,
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
