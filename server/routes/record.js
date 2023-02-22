const authMiddleware = require('../middleware/auth')
const { Router } = require('express')
const User = require('../models/User')


const router = new Router()

router.post('/new', authMiddleware, async (req, res) => {
	try {
		const { score, time} = req.body
		const User = await User.findOne({ _id: req.user.id })

		const date = Date();

		const record = {
			score: score,
			time: time,
			date: date
		}

		User.records.push(record)
		if(User.bestRecord !== null && User.bestRecord !=='' && User.bestRecord !== 'null'){
			bestRecord = User.bestRecord
			if(record.score > bestRecord.score){
				User.bestRecord = record
			} else if(record.score === bestRecord.score){
				if(record.time < bestRecord.time){
				User.bestRecord = record
				}
			} else {
				console.log('No changes')
			}

		} else {
			User.bestRecord = record
		}

		await User.save()
		return res.status(200).json({
			message: `${User.username}'s record at ${score} points with time ${time} seconds has been saved. Date: ${date}`
		})
	} catch (e) {
		console.log(e)
		res.send({ message: 'Server error' })
	}
})

module.exports = router
