const router = require('express').Router()
const AuthCtrl = require('../controllers/AuthCtrl')
//register
router.post('/register', AuthCtrl.register)
//check email availability
router.post('/checkEmailAvailability', AuthCtrl.checkEmailAvailability)
//login
router.post('/login', AuthCtrl.login)
//check access token
router.post('/checkTokens', AuthCtrl.checkTokens)

module.exports = router