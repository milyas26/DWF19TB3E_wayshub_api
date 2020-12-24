const { cloudinary } = require('../../config/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// UPLOAD PROFILE
exports.uploadChannelFiles = (thumbnail, photo) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      return {
        folder: `uploads/images`,
        public_id: `${Date.now()} - ${file.originalname}`,
      }
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
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      console.log(file.fieldname)
      return {
        folder: 'uploads/videos',
        resource_type: file.fieldname === 'video' ? 'video' : 'image',
        public_id: `${Date.now()} - ${file.originalname}`,
      }
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
