import axios from 'axios'

export const record = async () => {
	const user = await User.findOneAndUpdate(
		{ username: req.body.username },
		{ $push: { records: { score: req.body.score, time: req.body.time } } },
		{ new: true }
	)

	// Check if the user's new score is greater than their bestRecord score
	if (req.body.score > user.bestRecord.score) {
		// Update the user's bestRecord with the new score and time
		user.bestRecord = { score: req.body.score, time: req.body.time }
		await user.save()
	}

	// If the user's new score is equal to their bestRecord score, compare the times
	if (
		req.body.score === user.bestRecord.score &&
		req.body.time < user.bestRecord.time
	) {
		// Update the user's bestRecord with the new time
		user.bestRecord.time = req.body.time
		await user.save()
	}

	// Update the leaderboard in MongoDB
	const users = await User.find()
	const sortedUsers = users.sort((a, b) => {
		if (a.bestRecord.score > b.bestRecord.score) return -1
		if (a.bestRecord.score < b.bestRecord.score) return 1
		if (a.bestRecord.score === b.bestRecord.score) {
			if (a.bestRecord.time < b.bestRecord.time) return -1
			if (a.bestRecord.time > b.bestRecord.time) return 1
		}
		return 0
	})
	const rankedUsers = sortedUsers.map((user, index) => ({
		username: user.username,
		bestRecord: user.bestRecord,
		rank: index + 1
	}))
	// Update the leaderboard collection in MongoDB with the rankedUsers array
}
