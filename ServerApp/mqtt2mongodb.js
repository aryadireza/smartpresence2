var mqtt = require('mqtt'); //includes mqtt server 
var mongodb = require('mongodb'); // includes mongoDB 
var mongodbClient = mongodb.MongoClient; //initialises the mongoDB client
var mongodbURI = 'mongodb://localhost:27017/mydb'; //activating the MongoDB port 27017, here TempMontor is the name of the database
//var deviceRoot = "demo/device/"; //deviceroot is topic name given in arduino code 
var collection,client; //initialise collection and client

mongodbClient.connect(mongodbURI, setupCollection); //connect the database with collecion
     
function setupCollection(err, db) {
   if(err) throw err;
   collection="db.test_mqtt"; //name of the collection in the database
   client=mqtt.connect('mqtt://things.ubidots.com', {username:'A1E-2SRFnNTlgx6nfdScCrfJIotfDVVAOE', password:""}); //connecting the mqtt server with the MongoDB database
   client.subscribe({"/v1.6/devices/device/rssi": 1}, function(err, granted) {
  console.log(granted);
});//subscribing to the topic name 
   client.on('message', insertEvent); //inserting the event
}

//function that displays the data in the MongoDataBase
function insertEvent(topic,message) {
   var key=topic.replace(deviceRoot,'');

   collection.update(
   { _id:key }, 
   { $push: { events: { event: {  value:message, when:new Date() } } } }, 
   { upsert:true },

   function(err,docs) {  
   if(err) {
      console.log("Insert fail")// Improve error handling		
	 }
 }

 );

}