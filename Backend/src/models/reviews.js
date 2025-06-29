import mongoose from "mongoose";

// Define the schema for the "tags" subdocument
const tagSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['positive', 'negative', 'neutral'], default: 'neutral' },
});

// Define the schema for the review
const reviewSchema = new mongoose.Schema({
  user: {
    initials: { type: String, required: true },
    username: { type: String, required: true },
  },
  review: {
    content: { type: String, required: true },
    casino: { type: String, required: true },
    timestamp: { type: String, default: 'Just now' }, // Store as a string, but can be a Date if preferred
    rating: { type: Number, min: 1, max: 5, required: true },
    tags: [tagSchema], // Embed the tags as an array of tag documents
  },
  approved: {
    type: Boolean,
    default: false, // Reviews are unapproved by default
  },
});

// Create the Review model from the schema
const Review = mongoose.model("Reviews", reviewSchema);

export default Review;