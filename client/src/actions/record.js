import axios from 'axios'
import { set } from '../reducers/leaderboard'

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
// Action Types
export const FETCH_LEADERBOARD_REQUEST = 'FETCH_LEADERBOARD_REQUEST';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAILURE = 'FETCH_LEADERBOARD_FAILURE';

// Action Creators
export const fetchLeaderboardRequest = () => {
  return {
    type: FETCH_LEADERBOARD_REQUEST
  }
}

export const fetchLeaderboardSuccess = (leaderboard) => {
  return {
    type: FETCH_LEADERBOARD_SUCCESS,
    payload: leaderboard
  }
}

export const fetchLeaderboardFailure = (error) => {
  return {
    type: FETCH_LEADERBOARD_FAILURE,
    payload: error
  }
}

// Async Action Creator
export const leaderboard = () => {
  return (dispatch) => {
    dispatch(fetchLeaderboardRequest());
    axios.get('/leaderboard')
      .then(response => {
        const leaderboard = response.data;
        dispatch(fetchLeaderboardSuccess(leaderboard));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchLeaderboardFailure(errorMessage));
      })
  }
}

