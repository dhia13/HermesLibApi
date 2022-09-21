const router = require('express').Router()
const ReviewCtrl = require('../controllers/ReviewCtrl')
const { protect, admin } = require('../middleware/auth')

//add Review
router.post('/:id', protect, ReviewCtrl.addReview)
// delete Review
router.delete('/:id', protect, ReviewCtrl.deleteReview)
//Edit Book
router.put('/:id', protect, ReviewCtrl.editReview)
module.exports = router