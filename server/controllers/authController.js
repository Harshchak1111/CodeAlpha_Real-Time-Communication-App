const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    const existing = await User.findOne({ username })
    if (existing) return res.status(400).json({ message: 'User already exists' })

    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashed })
    await user.save()

    res.status(201).json({ message: 'Registered successfully' })
  } catch {
    res.status(500).json({ message: 'Registration error' })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(401).json({ message: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Incorrect password' })

    const token = jwt.sign({ username }, process.env.JWT_SECRET)
    res.json({ token })
  } catch {
    res.status(500).json({ message: 'Login error' })
  }
}
