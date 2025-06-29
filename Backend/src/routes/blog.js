import express from 'express';
import { upload } from "../middlewares/multer.js";
import { allBlog, deleteBlog, getBlogById, newBlog, updateBlog } from "../controllers/blog.js";
const router = express.Router();

router.get("/blogs",allBlog);
router.get("/blogs/:id", getBlogById);  // Fetch a specific blog by ID
router.post("/newBlogs",upload.single("image"), newBlog);
router.route("/blogs/:id").put(upload.single("image"), updateBlog)
.delete(deleteBlog);

export default router;