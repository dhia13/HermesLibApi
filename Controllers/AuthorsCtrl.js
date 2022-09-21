const Author = require('../Models/Author')
const Book = require('../Models/Book')
const Review = require('../Models/Review')
const User = require('../Models/User')
const AuthorCtrl = {
    addAuthor: async (req, res) => {
        try {
            const authorExist = await Author.findOne({ name: req.body.name })
            if (authorExist) {
                res.status(201).json({ success: false, msg: 'author already exist' })
            }
            else {
                const newAuthor = new Author(req.body)
                await newAuthor.save()
                res.status(201).json({ success: true, msg: 'author created', Author: newAuthor })
            }
        } catch (error) {
            res.status(500).json({ success: false, msg: error })
        }
    },
    editAuthor: async (req, res) => {
        try {
            const AuthorID = req.params.id
            const authorExist = await Author.findById(AuthorID)
            if (!authorExist) {
                res.status(404).json({ success: false, msg: 'author does not exist' })
            }
            else {
                await Author.findByIdAndUpdate(AuthorID, req.body)
                const AuthorData = await Author.findById(AuthorID)
                res.status(201).json({ success: true, msg: 'Author Updated' })
            }
        } catch (error) {
            res.status(500).json({ success: false, msg: error })
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            const authorID = req.params.id
            const author = await Author.findById(authorID)
            if (!author) {
                res.status(404).json({ success: false, msg: 'author does not exist' })
            }
            else {

                const authorBooks = author.books
                console.log(authorBooks)
                if (!authorBooks) {
                    await Author.findByIdAndDelete(authorID)
                    res.status(404).json({ success: true, msg: 'author deleted' })
                }
                else {
                    for (let i = 0; i < authorBooks.length; i++) {
                        const book = await Book.findById(authorBooks[i])
                        const bookReviews = book.reviews
                        //remove book reviews from users reviews and delete them
                        for (let n = 0; n < bookReviews.length; n++) {
                            const review = await Review.findById(bookReviews[n])
                            await User.findByIdAndUpdate(review.owner, {
                                $pull: {
                                    reviews: review._id
                                }
                            }, { new: true })
                            await Review.findByIdAndRemove(review._id)
                        }
                        //remove book 
                        await Book.findByIdAndRemove(bookReviews[i])
                    }
                    // remove author
                    await Author.findByIdAndRemove(authorID)
                    res.status(200).json({ success: true, msg: 'author and books are deleted' })
                }
            }
        } catch (error) {

        }
    },
    getAuthor: async (req, res) => {
        try {
            const AuthorId = req.params.id
            const AuthorData = await Author.findById(AuthorId)
            if (!AuthorData) {
                res.status(404).json({ success: false, msg: 'Author Does Not Exist' })
            }
            res.status(200).json({ success: true, msg: 'Author Found', Author: AuthorData })
        } catch (error) {
            res.status(500).json({ success: false, msg: error })
        }
    },
    getAllAuthors: async (req, res) => {
        try {
            const AuthorsData = await Author.find()
            res.status(200).json({ success: true, Authors: AuthorsData })
        } catch (error) {
            res.status(500).json({ success: false, msg: error })
        }
    },
    searshAuthors: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    authorsList: async (req, res) => {
        try {
            const AuthorsData = await Author.find().select({ 'name': 1 })
            res.status(200).json({ Authors: AuthorsData })
        } catch (error) {

        }
    }
}
module.exports = AuthorCtrl