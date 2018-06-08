const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
	name: String,
	MAC: String,
	rssi: Number
});

module.exports = mongoose.model('device',deviceSchema);