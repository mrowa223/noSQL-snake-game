import React from 'react'
import GameHeader from "./components/GameHeader"
import LeaderboardHeader from "./components/LeaderboardHeader"
import LoginHeader from "./components/LoginHeader"
import SignupHeader from "./components/SignupHeader"
import styles from "../source/style/header.css"

import { Link } from "react-router-dom";
const HeaderAuth = () => {
  return (
    <div className={styles}>
    <ul className={styles.ul}>
      <Link to="/login"><li className={styles.li}><GameHeader /></li></Link>
      <Link to="/login"><li className={styles.li}><LeaderboardHeader /></li></Link>
      <Link to="/signup"><li className={styles.li}><SignupHeader /></li></Link>
      <Link to="/login"><li className={styles.li}><LoginHeader /></li></Link>
    </ul>
  </div>
  )
}

export default HeaderAuth;