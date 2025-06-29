import Review from "../models/reviews.js";

// Get approved reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }); // Fetch all reviews from MongoDB
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
// Get all reviews 
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

// Add a new review
export const addNewReview = async (req, res) => {
  try {
    const { user, review } = req.body;
    const newReview = new Review({
      user,
      review,
      approved: false, // Default to unapproved
    });
    await newReview.save(); // Save the new review to MongoDB
    res.status(201).json({ message: "Review submitted for approval", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Failed to add review" });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { user, review } = req.body;
  
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { user, review },
      { new: true } // Returns the updated review
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: "Failed to update review" });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(204).end(); // No content to return
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};

// Approve function
export const approveReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndUpdate(
      id,
      { approved: true }, // Approve the review
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review approved successfully", review });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve review" });
  }
};