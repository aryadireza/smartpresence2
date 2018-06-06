var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.status(200).send({
    status: 'ok',
    result: {}
  })
});

router.get('/listdata', function (req, res, next) {
  res.status(200).send({
    status: 'ok',
    result: {}
  })
});

router.post('/emit', function (req, res, next) {
  let reqBody = req.body
  console.log('req body:', reqBody)
  res.status(200).send({
    status: 'ok'
  })
});

module.exports = router;
