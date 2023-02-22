const authMiddleware = require('../middleware/auth')
const { Router } = require('express')
const UserModel = require('../models/User')

const router = new Router()

router.post('/new', authMiddleware, async (req, res) => {
	try {
		const { score, time } = req.body
		const User = await UserModel.findOne({ _id: req.user.id })

		const date = new Date()

		const record = {
			score: score,
			time: time,
			date: date
		}

		User.records.push(record)
		await User.save()

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
				}
			} else {
				User.bestRecord = record
				await User.save()
			}
		} else {
			User.bestRecord = record
			await User.save()
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

router.get('/leaderboard', async (req, res) => {
	try {
		const leaderboard = await UserModel.aggregate([
			{ $match: { 'bestRecord.score': { $exists: true } } }, // filter out documents that don't have a bestRecord.score field
			{ $project: { username: 1, bestRecord: 1 } }, // only include the username and bestRecord fields in the output
			{ $sort: { 'bestRecord.score': -1 } } // sort by bestRecord.score in descending order
		]);
		// if(localStorage.getItem('leaderboard')){
		// 	localStorage.removeItem('leaderboard')
		// }
		// localStorage.setItem('leaderboard', leaderboard)
		res.send(leaderboard);
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
