const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
require('dotenv').config()

const app = express()
const PORT = config.get('port')

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