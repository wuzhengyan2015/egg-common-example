var express = require('express');
var router = express.Router();
const formidable = require('formidable');
const fs = require('mz/fs')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/upload', (req, res, next) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const reader = fs.createReadStream(files.file.filepath)
    const writer = fs.createWriteStream(`public/images/${files.file.originalFilename}`)

    reader.pipe(writer)
    await new Promise(resolve => {
      reader.on('end', () => { resolve(); });
    });
    res.json({ fields, files });
  });
})

router.post('/api/multer', upload.single('file'), (req, res, next) => {
  res.json({ body: req.body, file: req.file });
})

module.exports = router;
