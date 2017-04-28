var express = require('express');
var router = express.Router();
const ResponseBuilder = require('./responsebuilder');
const request = require('request-promise');


router.get('/:word', (req, res, next) => {
  request({ uri: 'http://owlbot.info/api/v1/dictionary/'+req.params.word, method: 'GET' })
    .then(function(response) {
      console.log(response);
      res.send(JSON.parse(response));
    });
})

module.exports = router;
