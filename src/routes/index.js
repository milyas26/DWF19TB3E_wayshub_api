const express = require('express')
const router = express.Router()

const {
  getChannels,
  getSingleChannel,
  addChannel,
  loginChannel,
  updateChannel,
} = require('../controllers/channels')

// CHANNELS
router.get('/channels', getChannels)
router.get('/channel/:id', getSingleChannel)
router.patch('/channel/:id', updateChannel)
router.post('/register', addChannel)
router.post('/login', loginChannel)

module.exports = router
