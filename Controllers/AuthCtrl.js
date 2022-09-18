const { User } = require('../models/User')
const generateToken = require('../middleware/jwt')
const jwt = require('jsonwebtoken')

const authCtrl = {
    register: async (req, res) => {
        try {
            const { name, password, email } = req.body
            // email Validation
            const validate = validateEmail(email)
            if (!validate) return res.status(409).json({ msg: 'Email Invalid', success: false })
            // Check if email exists
            const user_email = await User.findOne({ email })
            if (user_email) return res.status(409).json({ msg: 'Email Already Taken', success: false })
            // check password Strenght
            if (password.length < 6) return res.status(422).json({ msg: 'password too weak', success: false })
            // Save User
            const newUser = new User({
                name, email, password
            })
            await newUser.save()
            res.status(200).json({
                msg: "Account registered!",
                tokens: {
                    accessToken: generateToken(newUser._id, process.env.ACCESS_TOKEN_SECRET, '1d'),
                    refreshToken: generateToken(newUser._id, process.env.REFRESH_TOKEN, '7d')
                },
                success: true
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message, success: false })
        }
    },
    checkEmailAvailability: async (req, res) => {
        try {
            const email = req.body.email
            const validate = validateEmail(email)
            if (!validate) return res.status(409).json({ msg: 'Email Invalid', success: false })
            else {
                const check = await User.findOne({ email })
                if (check) return res.status(409).json({ msg: "This email already exists.", success: false })
                else return res.status(200).json({ msg: "Email available", success: true })
            }
        } catch (error) {
            return res.status(500).json({ msg: err.message, success: false })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                res.status(401).json({ success: false, msg: 'wrong credentials' })
            }
            const match = await user.matchPassword(password)
            if (!match) {
                res.status(401).json({ success: false, msg: 'wrong credentials' })
            }
            if (user && match) {
                res.status(200).json({
                    msg: "User Logged in!",
                    tokens: {
                        accessToken: generateToken(user._id, process.env.ACCESS_TOKEN_SECRET, '1d'),
                        refreshToken: generateToken(user._id, process.env.REFRESH_TOKEN, '7d')
                    },
                    success: true
                })
            }
        } catch (error) {
            res.status(500).json({ success: false, msg: error.messages })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const refreshTK = req.body.refreshToken
            const decoded = jwt.verify(refreshTK, process.env.REFRESH_TOKEN)
            if (decoded) {
                res.status(200).json({
                    msg: "token refreshed",
                    accessToken: generateToken(decoded.id, process.env.ACCESS_TOKEN_SECRET, '1d'),
                    success: true
                })
            }
            else {
                res.status(401).json({ Msg: 'Token Expired reLogin ', success: false })
            }
        } catch (error) {
            res.status(500).json({ success: false, msg: error.messages })
        }
    },
    checkToken: async (req, res) => {
        try {
            const token = req.body.token
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN)
            if (decoded) {
                res.cookie('accessToken', generateToken(decoded.id, process.env.ACCESS_TOKEN_SECRET, '1h'), { maxAge: 900000, httpOnly: false }).status(200).json({
                    msg: "token refreshed",
                    success: true
                })
            }
            else {
                res.status(401).json({ Msg: 'Token Expired reLogin ', success: false })
            }
        } catch {
            res.status(401).json({ Msg: 'Token Expired reLogin ', success: false })
        }
    }
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = authCtrl