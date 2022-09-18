const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    pages: {
        type: Number
    },
    genre: {
        type: Array
    },
    cover: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMMwS7fqFrpMTwZOFzSS11bvIsUmFSu5TVI1WvHmuLb_Zr_DiRDabQPGOxLOY3vhEZBpk&usqp=CAU'
    },
    language: {
        type: String
    },
    country: {
        type: String
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
        default: []
    },
    rating: {
        type: Number,
        default: 0
    }

},
    { timestamps: true }
)
const Book = mongoose.model('Book', bookSchema);
module.exports = Book