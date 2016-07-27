var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	message: String,
});

module.exports = mongoose.model('Contact', contactSchema);
