const router = require('express').Router()
const BooksCtrl = require('../controllers/BooksCtrl')
//add Book
router.post('/', BooksCtrl.createBook)
// delete Book
router.delete('/:id', BooksCtrl.deleteBook)
//Edit Book
router.put('/:id', BooksCtrl.editBook)
//Get Book
router.get('/:id', BooksCtrl.getBook)
//Get All Books
router.get('/allBooks', BooksCtrl.allBooks)
// searsh Books
router.get('/searsh', BooksCtrl.searchBooks)
module.exports = router