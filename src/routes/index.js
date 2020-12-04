const express = require('express')
const router = express.Router()

const {
  getChannels,
  getSingleChannel,
  addChannel,
  loginChannel,
  updateChannel,
  deleteChannel,
  //   restoreChannel,
} = require('../controllers/channels')

const {
  getVideos,
  getDetailVideo,
  addVideo,
  updateVideo,
  deleteVideo,
} = require('../controllers/videos')

// CHANNELS
router.get('/channels', getChannels)
router.get('/channel/:id', getSingleChannel)
router.patch('/channel/:id', updateChannel)
router.delete('/channel/:id', deleteChannel)
// router.post('/channel/:id', restoreChannel)
router.post('/register', addChannel)
router.post('/login', loginChannel)

// VIDEOS
router.get('/videos', getVideos)
router.get('/video/:id', getDetailVideo)
router.post('/video', addVideo)
router.patch('/video/:id', updateVideo)
router.delete('/video/:id', deleteVideo)

module.exports = router
