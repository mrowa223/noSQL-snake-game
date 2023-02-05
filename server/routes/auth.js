const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const router = new Router()

const validation = [
	check('email').isEmail().withMessage('Incorrect e-mail').normalizeEmail(),
	check('username')
		.isLength({ min: 4, max: 20 })
		.withMessage('Username must be longer than 4 characters and shorter than 20')
		.matches(/^[a-zA-Z]/)
		.withMessage('Username must start with letter')
		.matches(/^\w+$/)
		.withMessage(
			'Username must consist only of letters, digits and _ (underscore character)'
		),
	check('password')
		.isLength({ min: 4, max: 20 })
		.withMessage('Password must be longer than 4 characters and shorter than 20')
]

router.post('/register', validation, async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Validation error', errors })
		}

		const { email, username, password } = req.body

		let candidate = await User.findOne({ email })
		if (candidate) {
			return res
				.status(400)
				.json({ message: `User with '${email}' e-mail already exists` })
		}

		candidate = await User.findOne({
			username: { $regex: new RegExp(username, 'i') }
		})
		if (candidate) {
			return res.status(400).json({
				message: `User with '${username}' username already exists`
			})
		}

		const hashedPassword = await bcrypt.hash(password, 7)

		const user = new User({ email, username, password: hashedPassword })
		await user.save()

		return res.status(201).json({
			message: `User '${username}' has been succesfully registered`
		})
	} catch (e) {
		console.log(e)
		res.send({ message: 'Server error' })
	}
})

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await User.findOne({ username: { $regex: new RegExp(username, 'i') } })
		if (!user) {
			return res.status(400).json({ message: 'User not found' })
		}

		const isValid = bcrypt.compareSync(password, user.password)
		if (!isValid) {
			return res.status(400).json({ message: 'Invalid password' })
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
			expiresIn: '1h'
		})

		return res.json({
			token,
			user: {
				id: user.id,
				email: user.email,
				username: user.username
			}
		})
	} catch (e) {
		console.log(e)
		res.send({ message: 'Server error' })
	}
})

module.exports = router
