const Review = require('../models/Review');


exports.addReview = async (req,res)=>{

    //check user exists or not

    const {productId, rating, comment} = req.body;
    const userId = req.user._id;
    try {
        const existingReview = await Review.findOne({ userId, productId });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }
        const review = new Review({
            userId,
            productId,
            rating,
            comment
        });
        await review.save();
        res.status(201).json({ message: "Review added successfully", review });

    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal server error" });
    }


}

exports.getReviews = async (req, res) => {
    const productId = req.params.productId;

    try {
        const reviews = await Review.find({ productId }).populate('userId', 'name email');
        
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user._id;

    try {
        const review = await Review.findOneAndDelete({ _id: reviewId, userId });
        if (!review) {
            return res.status(404).json({ message: "Review not found or you do not have permission to delete this review" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    try {
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, userId },
            { rating, comment },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found or you do not have permission to update this review" });
        }

        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
