const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = Schema({
	firstname:{
		type: String,
		required: true
	},
	lastname:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true
	},
	phone:{
		type: String,
		required: true
	}
})

module.exports = mongoose.model('User', UserSchema)
