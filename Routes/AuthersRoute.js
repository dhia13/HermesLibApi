const router = require('express').Router()
const AuthorsCtrl = require('../controllers/AuthorsCtrl')
const { protect, admin } = require('../middleware/auth')

//add Author
router.post('/', protect, admin, AuthorsCtrl.addAuthor)
// delete Author
router.delete('/:id', protect, admin, AuthorsCtrl.deleteAuthor)
//Edit Author
router.put('/:id', protect, admin, AuthorsCtrl.editAuthor)
//Get Author
router.get('/:id', AuthorsCtrl.getAuthor)
//Get All Authors
router.get('/admin/all', protect, admin, AuthorsCtrl.getAllAuthors)
//get Authors names
router.get('/get/authorsList', AuthorsCtrl.authorsList)
// searsh Authors
router.get('/searsh', AuthorsCtrl.searshAuthors)
module.exports = router