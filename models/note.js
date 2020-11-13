const mongoose = require('mongoose')

const {Schema} = mongoose

const NoteSchema = Schema({
	title:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	isEnabled: {
		type: Boolean,
		default: true
	},
	isFavorite: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('Note', NoteSchema)
