const router = require('express').Router()
const AuthCtrl = require('../controllers/AuthCtrl')
//register
router.post('/register', AuthCtrl.register)
//check email availability
router.post('/checkEmailAvailability', AuthCtrl.checkEmailAvailability)
//login
router.post('/login', AuthCtrl.login)
//refresh token 
router.post('/refresh', AuthCtrl.refreshToken)
//check token
router.post('/checkToken', AuthCtrl.checkToken)
module.exports = router