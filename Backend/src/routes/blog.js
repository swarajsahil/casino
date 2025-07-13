import express from 'express';
import { upload } from "../middlewares/multer.js";
import { allBlog, approveBlog, deleteBlog, getBlogById, newBlog, unapprovedBlog, updateBlog } from "../controllers/blog.js";
const router = express.Router();

// // Public route: Get approved reviews
router.get("/blogs",unapprovedBlog);

// Admin route: Get all reviews
router.get("/blogs/all", allBlog);

router.get("/blogs/:id", getBlogById);  // Fetch a specific blog by ID
router.post("/newBlogs",upload.single("image"), newBlog);
router.route("/blogs/:id").put(upload.single("image"), updateBlog)
.delete(deleteBlog);
// Approve a review
router.patch("/blogs/approve/:id", approveBlog); 

export default router;