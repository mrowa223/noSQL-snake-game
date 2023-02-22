const { Schema, model } = require('mongoose')

const Record = new Schema({
	score: Number,
	time: Number,
	date: { type: Date, default: Date.now }
})

module.exports = model('Record', Record)
