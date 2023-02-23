import axios from 'axios'

export const newRecord = async (score, time) => {
	try {
		const response = await axios.post(
			'http://localhost:4000/api/record/new',
			{
				score: score,
				time: time
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}
		)
		console.log(response.data.message)
	} catch (e) {
		console.log(e)
	}
}
