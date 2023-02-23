import React, { useState, useEffect } from 'react'
import HeaderMain from '../layout/HeaderMain'
import axios from 'axios'

const User = () => {
	const [records, setRecords] = useState({})

	useEffect(() => {
		const fetchRecords = async () => {
			try {
				const response = await axios.get(
					'http://localhost:4000/api/record/userRecords',
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								'token'
							)}`
						}
					}
				)
				setRecords(response.data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchRecords()
		console.log(records)
	}, [])

  return (
    <>
      <HeaderMain />
      {records.username ? (
        <div className='container-user'>
          <h2>Player Data</h2>
          <h1 className='username-user'>{records.username}</h1>
          <div>Email: {records.email}</div>
          <div>Best score: {records.bestRecord.score}</div>
          <div>Best time: {records.bestRecord.time} sec</div>
        </div>
      ) : (
        <div>Loading user data...</div>
      )}
      {records.records ? (
        <div className='container-leader'>
          <div className='playerslist'>
            <div className='table'>
              <div>#</div>
              <div>date</div>
              <div>Score</div>
              <div>Time</div>
            </div>
            <div className='list'>
              {records.records.map((record, index) => (
                <div className='player' key={record._id}>
                  <span> {index + 1}</span>
                  <div className='user'>
                    <span> {record.date} </span>
                  </div>
                  <span> {record.score} </span>
                  <span> {record.time} </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading user records...</div>
      )}
    </>
  )
}

export default User
