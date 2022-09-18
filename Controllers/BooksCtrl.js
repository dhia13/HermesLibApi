const Book = require('../Models/Book')
const Author = require('../Models/Author')
const BookCtrl = {
    getBook: async (req, res) => {
        try {
            const bookID = req.params.id
            const book = await Book.findById(bookID).populate('Author', { Name: 1, Picture: 1 })
            if (!book) {
                return res.status(404).json({ error: 'Book do not exist' })
            }
            res.status(200).json({ Book: book })
        } catch (error) {
            res.status(404).json({ messages: error.messages });
        }
    },
    createBook: async (req, res) => {
        try {
            const AuthorData = await Author.findOne({ Name: req.body.author }).select({ _id: 1 })
            const newBook = new Book({
                title: req.body.title,
                pages: req.body.pages,
                genre: req.body.genre,
                cover: req.body.cover,
                language: req.body.language,
                author: AuthorData._id,
            })
            await newBook.save()
            await Author.findOneAndUpdate({ name: req.body.author }, {
                $push: { books: newBook._id }
            },
                { new: true }
            )
            res.status(201).json({ msg: 'book created', Book: newBook })
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    },
    deleteBook: async (req, res) => {

    },
    editBook: async (req, res) => {

    },
    allBooks: async (req, res) => {

    },
    searchBooks: async (req, res) => {

    }
}
module.exports = BookCtrl