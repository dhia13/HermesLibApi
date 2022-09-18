const Author = require('../Models/Author')
const AuthorCtrl = {
    createAuthor: async (req, res) => {
        try {
            const newAuthor = new Author(req.body)
            await newAuthor.save()
            res.status(201).json({ msg: 'book created', Author: newAuthor })

        } catch (error) {
            res.status(500).json({ msg: error })
        }
    },
    editAuthor: async (req, res) => {
        try {
            const AuthorID = req.params.id
            await Author.findByIdAndUpdate(AuthorID, req.body)
            const AuthorData = await Author.findById(AuthorID).populate('Books', { Title: 1, Cover: 1 })
            res.status(201).json({ msg: 'Author Updated', Author: AuthorData })
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    },
    deleteAuthor: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    getAuthor: async (req, res) => {
        try {
            const AuthorId = req.params.id
            console.log(AuthorId)
            const AuthorData = await Author.findById(AuthorId)
            console.log(AuthorData)
            if (!AuthorData) {
                res.status(404).json({ msg: 'Author Does Not Exist' })
            }
            res.status(200).json({ msg: 'Author Found', Author: AuthorData })
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    },
    getAllAuthors: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    searshAuthors: async (req, res) => {
        try {

        } catch (error) {

        }
    }
}
module.exports = AuthorCtrl