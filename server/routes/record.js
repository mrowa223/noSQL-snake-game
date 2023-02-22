const authMiddleware = require('../middleware/auth')
const { Router } = require('express')
const UserDoc = require('../models/User')

const router = new Router()

router.post('/new', authMiddleware, async (req, res) => {
	try {
		const { score, time } = req.body
		const User = await UserDoc.findOne({ _id: req.user.id })

		const date = new Date()

		const record = {
			score: score,
			time: time,
			date: date
		}

		User.records.push(record)
		await User.save()
		console.log(record)
		bestRecord = User.bestRecord
		if (bestRecord in User) {
			if (score in User.bestRecord) {
				if (record.score > bestRecord.score) {
					User.bestRecord = record
					await User.save()
				} else if (record.score === bestRecord.score) {
					if (record.time < bestRecord.time) {
						User.bestRecord = record
						await User.save()
					}
				} else {
					console.log('No changes')
				}
			} else {
				User.bestRecord = record
				await User.save()
			}
		} else {
			User.bestRecord = record
			await User.save()
		}
		console.log(User.bestRecord)
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

/* User.bestRecord.score = record.score
User.bestRecord.time = record.time
User.bestRecord.date = record.date
 */
