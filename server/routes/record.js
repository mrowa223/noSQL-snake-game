const { Router } = require('express')
const User = require('../models/User')

const router = new Router()

router.post('/new', async (req, res) => {
	try {
		const { username, score, time } = req.body

		const user = await User.findOne({
			username: { $regex: new RegExp(username, 'i') }
		})

		const record = {
			score: score,
			time: time
		}

		user.records.push(record)

		await user.save()

		return res.status(200).json({
			message: `${user.username}'s record at ${record.score} points with time ${time} seconds has been saved`
		})
	} catch (e) {
		console.log(e)
		res.send({ message: 'Server error' })
	}
})

module.exports = router
