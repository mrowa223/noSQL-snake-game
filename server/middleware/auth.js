const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(400).json({ message: 'Authentication error' })
		}

		const decoded = jwt.verify(token, process.env.JWT_KEY)
		req.user = decoded

		next()
	} catch (e) {
		return res.status(400).json({ message: 'Authentication error' })
	}
}
