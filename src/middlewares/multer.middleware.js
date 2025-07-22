import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({storage: storage})


// Here cb means callback
// We simply copy paste this code., set the default folder in which we are storing our files
// and then returning the original file name from it . That's it.

// We can do much more things with this. But for now that is enough