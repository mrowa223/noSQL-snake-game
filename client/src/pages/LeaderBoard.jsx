import React, { useState, useEffect } from "react";
import HeaderMain from '../layout/HeaderMain'
import axios from 'axios';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/record/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (<>
    <HeaderMain />
    <div className="container-leader">
      <div className="playerslist">
        <div className="table">
          <div>#</div>
          <div>Username</div>
          <div>Score</div>
          <div>Time</div>
        </div>
        <div className="list">
          {leaderboard.map((leader, index) => (
            <div className="player" key={leader._id}>
              <span> {index + 1}</span>
              <div className="user">
                <span> {leader.username} </span>
              </div>
              <span> {leader.bestRecord.score} </span>
              <span> {leader.bestRecord.time} </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};

export default LeaderBoard;