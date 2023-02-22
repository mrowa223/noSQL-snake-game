import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
  return (
    <>
      <div className={'page'}>
			<div className={'container-login'}>
				<div className={'panel'}>
					<div className={'form'}>
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
							// onClick={() => dispatch(login(username, password))}
							type='submit'
							id='submit'
							value='Log in'
						/>

						<div className='info'>
							<Link className='info' to='/signup'>
								Sign up
							</Link>
							<a href='' className='info'>
								Forgot password
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>
  )
}

export default Login;