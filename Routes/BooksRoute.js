const router = require('express').Router()
const BooksCtrl = require('../controllers/BooksCtrl')
const { protect, admin } = require('../middleware/auth')

//add Book
router.post('/', protect, admin, BooksCtrl.createBook)
// delete Book
router.delete('/:id', protect, admin, BooksCtrl.deleteBook)
//Edit Book
router.put('/:id', protect, admin, BooksCtrl.editBook)
//Get Book
router.get('/:id', BooksCtrl.getBook)
//Get All Books
router.get('/all', protect, admin, BooksCtrl.allBooks)
// searsh Books
router.get('/searsh', BooksCtrl.searchBooks)
module.exports = router