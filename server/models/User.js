const { Schema, model } = require('mongoose')
const {Record} = require('./Record.js')

const User = new Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	records: [{
		score: Number,
		time: Number,
		date: { type: Date, default: Date.now }
	}],
	bestRecord: {
		score: Number,
		time: Number,
		date: { type: Date, default: Date.now }
	}
})

module.exports = model('User', User)
