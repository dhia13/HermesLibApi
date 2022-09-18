const jwt = require('jsonwebtoken')

const generateToken = (id, secret, duration) => {
    return jwt.sign({ id }, secret, {
        expiresIn: duration,
    })
}

module.exports = generateToken
