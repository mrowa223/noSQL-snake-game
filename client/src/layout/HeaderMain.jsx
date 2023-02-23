import React from 'react'
import GameHeader from "./components/GameHeader"
import LeaderboardHeader from "./components/LeaderboardHeader"
// import LoginHeader from "./components/LoginHeader"
import LogoutHeader from "./components/LogoutHeader"
// import SignupHeader from "./components/SignupHeader"
import UserHeader from "./components/UserHeader"
import styles from "../source/style/header.css"

import { Link } from "react-router-dom";
const HeaderMain = () => {
  return (
    <div className={styles}>
      <ul className={styles.ul}>
        <Link to="/"><li className={styles.li}><GameHeader /></li></Link>
        <Link to="/leaderboard"><li className={styles.li}><LeaderboardHeader /></li></Link>
        <Link to="/user"><li className={styles.li}><UserHeader /></li></Link>
        <Link to="/logout"><li className={styles.li}><LogoutHeader /></li></Link>
      </ul>
    </div>
  )
}

export default HeaderMain;