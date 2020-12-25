const express = require('express')
const router = express.Router()

const { auth: authentication } = require('../middleware/auth')

// const { uploadChannelFiles, uploadVideoFiles } = require('../middleware/upload')
const {
  uploadChannelFiles,
  uploadVideoFiles,
} = require('../middleware/cloudinaryUploads')

const {
  getChannels,
  getSingleChannel,
  updateChannel,
  deleteChannel,
  //   restoreChannel,
  updateChannelNew,
} = require('../controllers/channels')

const {
  addChannel,
  loginChannel,
  resetPassword,
  checkAuth,
} = require('../controllers/auth')

const {
  getVideos,
  getDetailVideo,
  addVideo,
  updateVideo,
  deleteVideo,
  increaseView,
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
  subscriptionChannel,
  getIdSubscriber,
} = require('../controllers/subscribes')

// CHANNELS
router.get('/channels', getChannels)
router.get('/channel/:id', getSingleChannel)
router.put(
  '/channel',
  authentication,
  uploadChannelFiles('thumbnail', 'photo'),
  updateChannel,
)
router.put(
  '/edit-channel',
  authentication,
  uploadChannelFiles('thumbnail', 'photo'),
  updateChannelNew,
)
router.patch('/channel/:id', resetPassword)
router.delete('/channel/:id', authentication, deleteChannel)
// router.post('/channel/:id', restoreChannel)

// REGISTER / LOGIN
router.post('/register', addChannel)
router.post('/login', loginChannel)
router.get('/check-auth', authentication, checkAuth)

// VIDEOS
router.get('/videos', getVideos)
router.get('/video/:id', getDetailVideo)
router.patch('/video/:id', increaseView)
router.post(
  '/video',
  authentication,
  uploadVideoFiles('thumbnail', 'video'),
  addVideo,
)
router.put(
  '/video/:id',
  authentication,
  uploadVideoFiles('thumbnail', 'video'),
  updateVideo,
)
router.delete('/video/:id', authentication, deleteVideo)

// COMMENTS
router.get('/video/:id/comments', getCommentsByVideoId)
router.get('/video/:id/comments/:commentId', getCommentDetail)
router.post('/video/:id/comment', authentication, addComment)
router.patch('/video/:id/comment/:commentId', authentication, editComment)
router.delete('/video/:id/comment/:commentId', authentication, deleteComment)

// SUBSCRIPTION
router.get('/subscribe', authentication, getSubscription)
router.post('/subscribe/:channelId', authentication, addSubscription)
router.delete('/subscribe/:channelId', authentication, unSubscribe)
router.get('/subscribtion', authentication, subscriptionChannel)
router.get('/subscriber/:id', authentication, getIdSubscriber)

module.exports = router
