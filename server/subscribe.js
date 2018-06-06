var mqtt = require("mqtt");
var client  = mqtt.connect('mqtt://things.ubidots.com', {username:'A1E-2SRFnNTlgx6nfdScCrfJIotfDVVAOE', password:""});
client.subscribe({"/v1.6/devices/device/rssi": 1}, function(err, granted) {
  console.log(granted);
});
client.on('message', function(topic, message, packet) {
    //here you can process updates from the broker
    console.log('topic:',topic.toString())
    console.log('message:',message.toString())
    console.log('packet:',packet.toString())
});
