const { Channel, Video, Comment } = require('../../models')

// GET ALL COMMENTS BY VIDEO ID
exports.getCommentsByVideoId = async (req, res) => {
  try {
    const { id } = req.params

    const data = await Video.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: [
          'title',
          'id',
          'thumbnail',
          'description',
          'viewcount',
          'video',
          'channelId',
          'ChannelId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: {
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
    })

    res.send({
      status: 'Success',
      data,
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

// GET COMMENT DETAIL BY VIDEO ID
exports.getCommentDetail = async (req, res) => {
  try {
    const { commentId } = req.params

    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
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
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
    })

    res.send({
      status: 'Success',
      data: {
        comment,
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

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { id: channelId } = req.channelId
    const { body } = req
    const { id } = req.params

    const newComment = await Comment.create({
      comment: body.comment,
      channelId: channelId,
      videoId: id,
    })

    const comment = await Comment.findOne({
      where: {
        id: newComment.id,
      },
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
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
    })

    res.send({
      status: 'Success',
      data: {
        comment,
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

// UPDATE COMMENT
exports.editComment = async (req, res) => {
  try {
    const { commentId } = req.params
    const { body } = req

    await Comment.update(body, {
      where: {
        id: commentId,
      },
    })

    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
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
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
    })

    res.send({
      status: 'Success',
      data: {
        comment,
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

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params

    const comment = await Comment.destroy({
      where: {
        id: commentId,
      },
    })

    res.send({
      status: 'Success',
      data: {
        comment,
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
