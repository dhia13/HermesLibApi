const router = require('express').Router()
const AuthorsCtrl = require('../controllers/AuthorsCtrl')
//add Author
router.post('/', AuthorsCtrl.createAuthor)
// delete Author
router.delete('/:id', AuthorsCtrl.deleteAuthor)
//Edit Author
router.put('/:id', AuthorsCtrl.editAuthor)
//Get Author
router.get('/:id', AuthorsCtrl.getAuthor)
//Get All Authors
router.get('/allBooks', AuthorsCtrl.getAllAuthors)
// searsh Authors
router.get('/searsh', AuthorsCtrl.searshAuthors)
module.exports = router