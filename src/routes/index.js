const express = require('express')
const router = express.Router()

const {
  getChannels,
  getSingleChannel,
  addChannel,
  loginChannel,
  updateChannel,
  deleteChannel,
  restoreChannel,
} = require('../controllers/channels')

// CHANNELS
router.get('/channels', getChannels)
router.get('/channel/:id', getSingleChannel)
router.patch('/channel/:id', updateChannel)
router.delete('/channel/:id', deleteChannel)
router.post('/channel/:id', restoreChannel)
router.post('/register', addChannel)
router.post('/login', loginChannel)

module.exports = router
