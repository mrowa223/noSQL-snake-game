import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../actions/user'

const Registration = () => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	return (
		<div class='page'>
			<div class='container-reg'>
				<div class='panel'>
					<div class='form'>
						<label for='email'>Email</label>
						<input
							onChange={(event) => setEmail(event.target.value)}
							value={email}
							type='email'
							id='email'
						/>

						<label for='username'>Username</label>
						<input
							onChange={(event) => setUsername(event.target.value)}
							value={username}
							type='text'
							id='username'
						/>

						<label for='password'>Password</label>
						<input
							onChange={(event) => setPassword(event.target.value)}
							value={password}
							type='password'
							id='password'
						/>

						<input
							onClick={() => signup(email, username, password)}
							type='submit'
							id='submit'
							value='Sign up'
						/>

						<div class='info'>
							{/* <a href="login.html" class="info">Login</a> */}
							<Link className='info' to='/login'>
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Registration
