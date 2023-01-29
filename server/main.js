const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth')
require('dotenv').config()

mongoose.set('strictQuery', true)

const app = express()
const PORT = config.get('port')

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URI)

		app.listen(PORT, () => {
			console.log(`Server started listening on ${PORT} port`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()
