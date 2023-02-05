const { Schema, model } = require('mongoose')

const User = new Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})
// TODO: other models

module.exports = model('User', User)
