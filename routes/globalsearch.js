var express = require('express');
var router = express.Router();
const ResponseBuilder = require('./responsebuilder');
const request = require('request-promise');


// router.get('/:word', (req, res, next) => {
//   request({ uri: 'http://owlbot.info/api/v1/dictionary/'+req.params.word, method: 'GET' })
//     .then(function(response) {
//       console.log(response);
//       res.send(JSON.parse(response));
//     });
// })

router.get('/:word', (req, res, next) => {
  request({
      uri: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + req.params.word,
      method: 'GET',
      resolveWithFullResponse: true,
      headers: {
        'Accept': 'application/json',
        'app_id': 'd3900461',
        'app_key': '16639cb92817985e70a5dfacb28a4cab'
      }
    })
    .then(response => {
      console.log(response.statusCode);
      if (response.statusCode != 200) {
        res.send([]);
        return;
      }
      let i = JSON.parse(response.body).results[0].lexicalEntries[0].entries[0].senses;
      console.log(i.examples);
      if (i[0].subsenses) {
        let j = { word: req.params.word, meaning: i[0].definitions[0], example: i[0].examples && i[0].examples[0].text };
        let k = i[0].subsenses.map(obj => ({ word: req.params.word, meaning: obj.definitions[0], example: obj.examples[0].text }));
        res.send([j, ...k]);
      } else {
        let j = i.map(obj => ({ word: req.params.word, meaning: obj.definitions[0], example: obj.examples && obj.examples[0].text }));
        res.send(j);
      }
      // res.send(JSON.parse(response));
    }, err => {
      console.log(err);
      res.send([]);
    });
})

module.exports = router;
