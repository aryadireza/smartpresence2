var express = require('express');
var router = express.Router();
var mongodb = require('mongodb'); // includes mongoDB 
var mongodbClient = mongodb.MongoClient;

const Device = require('../models/device');
const mongoose = require('mongoose');
router.get('/', function (req, res, next) {
  res.status(200).send({
    status: 'ok',
    result: {}
  })
});

router.get('/listdatascan', function (req, res, next) {
  mongodbClient.connect('mongodb://localhost:27017/', (err, client, db) => {
    if (err) return res.status(500).send({err:err})
    db = client.db('mydb')
    db.collection("DetectedDevices").find().toArray(function (err, results) {
      if (err) return res.status(500).send({err: err})
      return res.status(200).send({
        status: 'ok',
        results: results
      })
    })
  })
});
router.get('/listdataMahasiswa', function (req, res, next) {
  mongodbClient.connect('mongodb://localhost:27017/', (err, client, db) => {
    if (err) return res.status(500).send({err:err})
    db = client.db('mydb')
    db.collection("Mahasiswa").find().toArray(function (err, results) {
      if (err) return res.status(500).send({err: err})
      return res.status(200).send({
        status: 'ok',
        results: results
      })
    })
  })
});

router.get('/listdatafilter', function (req, res, next) {
  mongodbClient.connect('mongodb://localhost:27017/', (err, client, db) => {
    if (err) return res.status(500).send({err:err})
    db = client.db('mydb')
    db.collection("DetectedDevices").find({value:{$gt:-70}}).toArray(function (err, results) {
      if (err) return res.status(500).send({err: err})
      return res.status(200).send({
        status: 'ok',
        results: results
      })
    })
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