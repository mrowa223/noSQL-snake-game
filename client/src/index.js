import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// import  "./source/style";
import './source/style/leaderboard.css'
import './source/style/login.css'
import './source/style/header.css'
import './source/style/notFound.css'
// import "./source/style/leaderboard.css";

import './source/style/style.css'
import './source/style/user.css'

import Registration from './pages/Registration'
import Login from './pages/Login'
import LeaderBoard from './pages/LeaderBoard'
import NotFound from './pages/NotFound'
import User from "./pages/User"
import { Provider } from 'react-redux'
import { store } from '../src/reducers/index';
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />
	},
	{
		path: '/signup',
		element: <Registration />,
		errorElement: <NotFound />
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <NotFound />
	},
	{
		path: '/leaderboard',
		element: <LeaderBoard />,
		errorElement: <NotFound />
	},
	{
		path: '/user',
		element: <User />,
		errorElement: <NotFound />
	},
	{
		path: '/logout',
		element: <Registration />,
		errorElement: <NotFound />
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
