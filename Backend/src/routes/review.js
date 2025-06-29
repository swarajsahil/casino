import express from "express";
import { getReviews, addNewReview, updateReview, deleteReview, getAllReviews, approveReview } from "../controllers/reviews.js";

const router = express.Router();

// // Public route: Get approved reviews
router.get("/reviews", getReviews);

// Admin route: Get all reviews
router.get("/reviews/all", getAllReviews); 

// POST a new review
router.post("/newReviews", addNewReview);

// PUT (update) a review by ID
router.put("/reviews/:id", updateReview);

// DELETE a review by ID
router.delete("/reviews/:id", deleteReview);

// Approve a review
router.patch("/reviews/approve/:id", approveReview); 

export default router;

