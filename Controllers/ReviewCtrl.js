const Book = require('../Models/Book')
const Review = require('../Models/Review')
const User = require('../Models/User')
const ReviewAuth = {
    addReview: async (req, res) => {
        try {
            const newReview = new Review({
                owner: req.user._id,
                book: req.params.id,
                rating: req.body.rating,
                content: req.body.content
            })
            await newReview.save()
            const reviewId = newReview._id
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    reviews: reviewId
                },
            }, { new: true }
            )
            await Book.findByIdAndUpdate(req.params.id, {
                $push: {
                    reviews: reviewId
                },
            }, { new: true }
            )
            res.status(201).json({ msg: 'review Added', review: newReview })

        } catch (error) {
            res.status(500).json({ msg: error })
        }
    },
    editReview: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id)
            if (review.owner.equals(req.user._id)) {
                if (req.body.rating) {
                    await Review.findByIdAndUpdate(req.params.id, {
                        rating: req.body.rating
                    }, { new: true })
                }
                if (req.body.content) {
                    await Review.findByIdAndUpdate(req.params.id, {
                        content: req.body.content
                    }, { new: true })
                }
                res.status(201).json({ success: true, msg: 'review updated' })
            }
            else {
                res.status(401).json({ success: false, msg: 'not authorized' })
            }
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    },
    deleteReview: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id)
            const ownerId = review.owner
            const bookId = review.book
            if (ownerId.equals(req.user._id)) {
                await User.findByIdAndUpdate(ownerId, {
                    $pull: {
                        reviews: req.params.id
                    }
                }, { new: true })
                await Book.findByIdAndUpdate(bookId, {
                    $pull: {
                        reviews: req.params.id
                    }
                }, { new: true })
                await Review.findOneAndRemove(req.params.id)
                res.status(200).json({ succes: true, msg: 'review Deleted' })
            }
            else {
                res.status(404).json({ success: false, msg: 'not authorized' })
            }
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    }
}
module.exports = ReviewAuth