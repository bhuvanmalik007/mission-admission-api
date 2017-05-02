var express = require('express');
var router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://root:admin@ds039684.mlab.com:39684/apptest', ['words']);
const ResponseBuilder = require('./responsebuilder');


router.get('/mywords', function(req, res, next) {
  db.words.find().sort({_id:-1},(err, words) => {
    if (err) { return res.json(ResponseBuilder(err, false)); }
    res.json(ResponseBuilder(words, true));
  });
});

router.post('/mywords/add', function(req, res, next) {
  if (!req.body.word) { return res.json(ResponseBuilder({ message: 'data not found' }, false)); }
  const wordObj = req.body;
  db.words.save(wordObj, (err, wordObj) => {
    if (err) { return res.json(ResponseBuilder(err, false)); }
    res.json(ResponseBuilder({ wordObj, message: 'record saved' }, true));
  });
});

// router.get('/mywords/bulk', function(req, res, next) {
//   db.words.insert(wordArray, (err, wordArray) => {
//     err && res.json(ResponseBuilder(err, false));
//     res.json(ResponseBuilder({ wordArray, message: 'record saved' }, true));
//   });
// });

router.delete('/mywords/delete/:id', function(req, res, next) {
  const id = req.params.id;
  if (!id) { return res.json(ResponseBuilder({ message: 'id not found' }, false)); }
  db.words.remove({ _id: mongojs.ObjectId(id) }, (err, wordObj) => {
    if (err) { return res.json(ResponseBuilder(err, false)); }
    res.json(ResponseBuilder({ wordObj, message: 'record deleted' }, true));
  });
});

module.exports = router;
