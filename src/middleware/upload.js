const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// UPLOAD PROFILE
exports.uploadChannelFiles = (thumbnail, photo) => {
  //initialisasi multer diskstorage
  //menentukan destionation file diupload
  //menentukan nama file (rename agar tidak ada nama file ganda)
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images') //lokasih penyimpan file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) //rename nama file by date now + nama original
    },
  })

  //function untuk filter file berdasarkan type
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

  const maxSize = 100 * 1000 * 1000 //Maximum file size i MB

  //eksekusi upload multer dan tentukan disk storage, validation dan maxfile size
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
  ]) //fields digunakan karena file yang diupload lebih dari 1 fields

  //middleware handler
  return (req, res, next) => {
    upload(req, res, function (err) {
      //munculkan error jika validasi gagal
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError)

      //munculkan error jika file tidak disediakan
      if (!req.files && !err)
        return res.status(400).send({
          message: 'Please select files to upload',
        })

      //munculkan error jika melebihi max size
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file sized 10MB',
          })
        }
        return res.status(400).send(err)
      }

      //jika oke dan aman lanjut ke controller
      //akses nnti pake req.files
      return next()
    })
  }
}

// UPLOAD VIDEO
exports.uploadVideoFiles = (thumbnail, video) => {
  //initialisasi multer diskstorage
  //menentukan destionation file diupload
  //menentukan nama file (rename agar tidak ada nama file ganda)
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === thumbnail) {
        cb(null, 'uploads/images') //lokasih penyimpan file
      } else if (file.fieldname === video) {
        cb(null, 'uploads/videos') //lokasih penyimpan file
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) //rename nama file by date now + nama original
    },
  })

  //function untuk filter file berdasarkan type
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

  //eksekusi upload multer dan tentukan disk storage, validation dan maxfile size
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
  ]) //fields digunakan karena file yang diupload lebih dari 1 fields

  //middleware handler
  return (req, res, next) => {
    upload(req, res, function (err) {
      //munculkan error jika validasi gagal
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError)

      //munculkan error jika file tidak disediakan
      if (!req.files && !err)
        return res.status(400).send({
          message: 'Please select files to upload',
        })

      //munculkan error jika melebihi max size
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file sized 10MB',
          })
        }
        return res.status(400).send(err)
      }

      //jika oke dan aman lanjut ke controller
      //akses nnti pake req.files
      return next()
    })
  }
}
