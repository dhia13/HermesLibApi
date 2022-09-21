const Book = require('../Models/Book')
const Author = require('../Models/Author')
const Review = require('../Models/Review')
const User = require('../Models/User')
const BookCtrl = {
    getBook: async (req, res) => {
        try {
            const bookID = req.params.id
            const book = await Book.findById(bookID).populate('author', { name: 1, picture: 1 })
            if (!book) {
                return res.status(404).json({ success: false, messages: 'Book do not exist' })
            }
            res.status(200).json({ Book: book })
        } catch (error) {
            res.status(404).json({ success: false, messages: error.messages });
        }
    },
    createBook: async (req, res) => {
        try {
            const AuthorData = await Author.findOne({ Name: req.body.author }).select({ _id: 1 })
            if (!AuthorData) {
                res.status(401).json({ success: false, msg: 'author does not exist' })
            }
            else {
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
            }
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    },
    deleteBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id)
            // remove book from author
            await Author.findByIdAndUpdate(book.author, {
                $pull: {
                    books: req.params.id
                }
            }, { new: true })
            const bookReviews = book.reviews
            //remove book reviews from users reviews and delete them
            for (let i = 0; i < bookReviews.length; i++) {
                const review = await Review.findById(bookReviews[i])
                await User.findByIdAndUpdate(review.owner, {
                    $pull: {
                        reviews: review._id
                    }
                }, { new: true })
                await Review.findOneAndRemove(review._id)
            }
            //remove book 
            await Book.findByIdAndRemove(req.params.id)
            res.status(200).json({ success: true, msg: 'book Removed' })
        }
        catch (error) {

        }
    },
    editBook: async (req, res) => {

    },
    allBooks: async (req, res) => {

    },
    searchBooks: async (req, res) => {

    }
}
module.exports = BookCtrl