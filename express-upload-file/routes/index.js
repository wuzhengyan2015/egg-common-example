var express = require('express');
var router = express.Router();
const formidable = require('formidable');
const fs = require('mz/fs')

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

    await reader.pipe(writer)
    res.json({ fields, files });
  });
})

module.exports = router;
