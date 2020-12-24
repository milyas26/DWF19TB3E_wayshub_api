const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// UPLOAD PROFILE
exports.uploadChannelFiles = (thumbnail, photo) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    },
  })

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === thumbnail) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: 'Only image files are allowed!',
        }
        return cb(new Error('Only image files are allowed!'), false)
      }
    }

    if (file.fieldname === photo) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: 'Only image files are allowed!',
        }
        return cb(new Error('Only image files are allowed!'), false)
      }
    }
    cb(null, true)
  }

  const maxSize = 5 * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: thumbnail,
      maxCount: 1,
    },
    {
      name: photo,
      maxCount: 1,
    },
  ])

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError)

      if (!req.files && !err)
        return res.status(400).send({
          message: 'Please select files to upload',
        })

      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file sized 10MB',
          })
        }
        return res.status(400).send(err)
      }

      return next()
    })
  }
}

// UPLOAD VIDEO
exports.uploadVideoFiles = (thumbnail, video) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === thumbnail) {
        cb(null, 'uploads/images')
      } else if (file.fieldname === video) {
        cb(null, 'uploads/videos')
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    },
  })

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === thumbnail) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: 'Only image files are allowed!',
        }
        return cb(new Error('Only image files are allowed!'), false)
      }
    }

    if (file.fieldname === video) {
      if (!file.originalname.match(/\.(mp4|mkv|avi)$/)) {
        req.fileValidationError = {
          message: 'Only Video files are allowed!',
        }
        return cb(new Error('Only Video files are allowed!'), false)
      }
    }
    cb(null, true)
  }
  const maxSize = 100 * 1000 * 1000

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: thumbnail,
      maxCount: 1,
    },
    {
      name: video,
      maxCount: 1,
    },
  ])

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError)

      if (!req.files && !err)
        return res.status(400).send({
          message: 'Please select files to upload',
        })

      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file sized 10MB',
          })
        }
        return res.status(400).send(err)
      }
      return next()
    })
  }
}
