import { Blog } from "../models/blog.js";
import { processData } from "../utils/dataService.js";  // Import processData service
import ErrorHandler from "../middlewares/error.js";
import { uploadOnCloudinary , deleteFromCloudinary} from "../utils/cloudinary.js"; 
// Controller to handle fetching all blogs
export const allBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        next(error);
    }
};
// Controller to fetch a blog by its ID
export const getBlogById = async (req, res, next) => {
    try {
      const { id } = req.params;  // Get the ID from the URL parameter
  
      // Find the blog by ID
      const blogs = await Blog.findById(id);
      if (!blogs) {
        return next(new ErrorHandler("Blog not found", 404));  // If no blog is found, return an error
      }
  
      res.status(200).json({
        success: true,
        blogs,  // Return the found blog
      });
    } catch (error) {
      next(error);  // Pass the error to the error handler
    }
  };
// Controller to handle creating a new blog
// ADD BLOG
export const newBlog = async (req, res, next) => {
    try {
        const { author, title, description, keyTakeaways, content, image: imageUrl } = req.body;

        if (!author || !title || !description || !keyTakeaways || !content) {
            return next(new ErrorHandler("Title, description, key takeaways, and content are required", 400));
        }

        const processedKeyTakeaways = processData(keyTakeaways, 10);
        const processedContent = processData(content, 40);

        let image;
        let imagePublicId = null;

        if (imageUrl && typeof imageUrl === 'string') {
            image = imageUrl;
        } else if (req.file?.path) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return next(new ErrorHandler("Image upload failed", 500));
            }
            image = cloudinaryResponse.secure_url;
            imagePublicId = cloudinaryResponse.public_id;
        } else {
            return next(new ErrorHandler("Image URL or file is required", 400));
        }

        const blog = await Blog.create({
            author,
            title,
            description,
            keyTakeaways: processedKeyTakeaways,
            content: processedContent,
            image,
            imagePublicId
        });

        res.status(201).json({
            success: true,
            message: "Blog added successfully",
            blog,
        });
    } catch (error) {
        next(error);
    }
};


// UPDATE BLOG
export const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { author, title, description, keyTakeaways, content } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) return next(new ErrorHandler("Blog not found", 404));

        if (keyTakeaways) blog.keyTakeaways = processData(keyTakeaways, 10);
        if (content) blog.content = processData(content, 40);

        if (author) blog.author = author;
        if (title) blog.title = title;
        if (description) blog.description = description;

        blog.isCompleted = !blog.isCompleted;

        // Handle image update
        if (req.file?.path) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return next(new ErrorHandler("Image upload failed", 500));
            }

            // Delete old image from Cloudinary
            if (blog.imagePublicId) {
                await deleteFromCloudinary(blog.imagePublicId);
            }

            blog.image = cloudinaryResponse.secure_url;
            blog.imagePublicId = cloudinaryResponse.public_id;
        }

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog,
        });
    } catch (error) {
        next(error);
    }
};


// DELETE BLOG
export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return next(new ErrorHandler("Invalid Id", 404));

        if (blog.imagePublicId) {
            await deleteFromCloudinary(blog.imagePublicId);
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Blog Deleted"
        });
    } catch (error) {
        next(error);
    }
};