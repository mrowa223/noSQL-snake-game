import React from 'react'
import HeaderMain from "../layout/HeaderMain"
const User = () => {
  return (
    <><HeaderMain />
      <div className="container-user">
        <h2>Player Data</h2>
        <h1 className="username-user">John Doe</h1>
        <div>Email: john.doe@example.com</div>
        <div>Scores: 80, 90, 95</div>
      </div></>

  )
}

export default User