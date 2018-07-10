var mqtt = require("mqtt");
var MongoClient = require('mongodb').MongoClient;
var mongodbURI = 'mongodb://localhost:27017/mydb';
var client  = mqtt.connect('mqtt://things.ubidots.com', {username:'A1E-r4nhQPbg2b10o5hzNZ5pRlxPBVqsrX', password:""});
client.subscribe({"/v1.6/devices/device/test": 1}, function(err, granted) {
  console.log(granted);
});
client.on('message', function(topic, message, packet) {
    //here you can process updates from the broker
    console.log('topic:',topic.toString())
    console.log('message:',message.toString())
    console.log('packet:',packet.toString())
    MongoClient.connect(mongodbURI, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("mydb");
  		var msg = JSON.parse(message.toString());
  		//var myobj = { name: "Company Inc", address: "Highway 37" };
  		dbo.collection("DetectedDevices").insertOne(msg, function(err, res) {
    		if (err) throw err;
    	console.log("1 document inserted");
    	db.close();
  });
});
});
