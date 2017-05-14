var express = require('express');
var router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://root:admin@ds039684.mlab.com:39684/apptest', ['words']);
const ResponseBuilder = require('./responsebuilder');
const request = require('request-promise');
const createWordsArray = require('./oxfordJsonParser');


router.post('/multiple', (req, res, next) => {
  const promiseArray = req.body.words.map((word) =>
    request({
      uri: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + word,
      method: 'GET',
      resolveWithFullResponse: true,
      headers: {
        'Accept': 'application/json',
        'app_id': 'd3900461',
        'app_key': '16639cb92817985e70a5dfacb28a4cab'
      }
    })
  );
  Promise.all(promiseArray.map(p => p.catch(() => undefined)))
    .then(responses => {
      let wordsArray = responses.reduce((acc, response) => {
        if(!response)return acc;
        const body = JSON.parse(response.body);
        const singleWordArray = createWordsArray(body.results[0].lexicalEntries[0].entries[0].senses, body.results[0].word);
        return [...acc, ...singleWordArray];
      }, []);
        db.words.insert(wordsArray, (err, wordsArray) => {
          err && res.json(ResponseBuilder(err, false));
          res.json(ResponseBuilder({ wordsArray, message: 'records saved' }, true));
        });
    }, reason => {
      console.log('reason')
      res.send(reason);
    })
    .catch((err)=>res.json(ResponseBuilder({ wordsArray:[], err }, false)))
})


router.get('/', (req, res, next) => {
  res.send({ words: [] });
})


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
      const body = JSON.parse(response.body);
      const wordsArray = createWordsArray(body.results[0].lexicalEntries[0].entries[0].senses, body.results[0].word);
      const pronounciation = body.results[0].lexicalEntries[0].pronunciations[0].audioFile;
      res.send({ pronounciation, words: wordsArray });
    })
    .catch((err) => res.send({ words: [] }));
})

module.exports = router;
