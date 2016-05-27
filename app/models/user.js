var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	username: String,
	password: String,
	isLoggedIn: Boolean,
});

module.exports = mongoose.model('User', UserSchema);
