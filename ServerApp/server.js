//var dbo= db.db("mydb");
var mongodb = require('mongodb'); // includes mongoDB 
var mongodbClient = mongodb.MongoClient;
const express = require('express');
const app = express();
app.set('view engine','ejs')

mongodbClient.connect('mongodb://localhost:27017/', (err, client, db) => {
  if (err) return console.log(err)
  db = client.db('mydb') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
  db.collection("DetectedDevices").find().toArray(function(err, results) {
  console.log(results)
  //res.render('index.ejs', {quotes: result})
  // send HTML file populated with quotes here
})
})

app.get('/', (req, res) => {
	//renders index.ejs
	mongodbClient.connect('mongodb://localhost:27017/', (err, client, db) => {
  if (err) return console.log(err)
  db = client.db('mydb')
	db.collection("DetectedDevices").find().toArray(function(err, results) {
  //res.render('index.ejs', {quotes: result})
  // send HTML file populated with quotes here
	res.render('index.ejs', {quotes: results})
})
// renders index.ejs
})
})
  //	res.sendFile(__dirname + '/index.html')
