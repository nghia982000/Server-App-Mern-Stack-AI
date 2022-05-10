const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class AuthController {

    async register(req, res) {
        const { username, password, role} = req.body
        if (!username || !password) {
            return res.status(400).json({
                message: 'Missing username and/or password',
                success: false
            })
        }
        try {
            //check for existing user
            const user = await User.findOne({ username: username })

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken'
                })
            }
            //All good
            const hashedPassword = await argon2.hash(password)
            const newUser = new User({
                username,
                password: hashedPassword,
                role
            })
            await newUser.save()
            //Return token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
            res.json({
                success: true,
                message: 'User created successfully',
                accessToken
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }

    }

    async login(req, res) {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                message: 'Missing username and/or password',
                success: false
            })
        }
        try {
            //check for existing user
            const user = await User.findOne({ username: username })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username '
                })
            }
            //Username found
            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect password'
                })
            }
            //All good
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
            res.json({
                success: true,
                message: 'User logged in successfully',
                accessToken,
                role:user.role,
                user:{
                    _id:user._id,
                    username:user.username,
                    role:user.role
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    
    async checkLogin(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password')
            if (!user)
                return res.status(400).json({ success: false, message: 'User not found' })
            res.json({ success: true, user })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

module.exports = new AuthController()