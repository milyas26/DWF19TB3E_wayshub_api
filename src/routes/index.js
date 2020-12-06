const express = require('express')
const router = express.Router()

const { auth: authentication } = require('../middleware/auth')

const { uploadChannelFiles, uploadVideoFiles } = require('../middleware/upload')

const {
  getChannels,
  getSingleChannel,
  updateChannel,
  deleteChannel,
  //   restoreChannel,
} = require('../controllers/channels')

const { addChannel, loginChannel } = require('../controllers/auth')

const {
  getVideos,
  getDetailVideo,
  addVideo,
  updateVideo,
  deleteVideo,
} = require('../controllers/videos')

const {
  getCommentsByVideoId,
  getCommentDetail,
  addComment,
  editComment,
  deleteComment,
} = require('../controllers/comments')

const {
  getSubscription,
  addSubscription,
  unSubscribe,
} = require('../controllers/subscribes')

// CHANNELS
router.get('/channels', getChannels)
router.get('/channel/:id', getSingleChannel)
router.put(
  '/channel/:id',
  authentication,
  uploadChannelFiles('thumbnail', 'photo'),
  updateChannel,
)
router.delete('/channel/:id', authentication, deleteChannel)
// router.post('/channel/:id', restoreChannel)

// REGISTER / LOGIN
router.post('/register', addChannel)
router.post('/login', loginChannel)

// VIDEOS
router.get('/videos', getVideos)
router.get('/video/:id', getDetailVideo)
router.post(
  '/video',
  authentication,
  uploadVideoFiles('thumbnail', 'video'),
  addVideo,
)
router.patch('/video/:id', authentication, updateVideo)
router.delete('/video/:id', authentication, deleteVideo)

// COMMENTS
router.get('/video/:id/comments', getCommentsByVideoId)
router.get('/video/:id/comments/:commentId', getCommentDetail)
router.post('/video/:id/comment', authentication, addComment)
router.patch('/video/:id/comment/:commentId', authentication, editComment)
router.delete('/video/:id/comment/:commentId', authentication, deleteComment)

// SUBSCRIPTION
router.get('/subscribe', getSubscription)
router.post('/subscribe', addSubscription)
router.delete('/subscribe/:id', unSubscribe)

module.exports = router
