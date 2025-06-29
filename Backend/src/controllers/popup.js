import ErrorHandler from "../middlewares/error.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { Popup } from "../models/popup.js";

export const allPopup = async (req, res, next) => {
    try {
        const popup = await Popup.findOne({});
        res.status(200).json({
            success: true,
            popup
        });
    } catch (error) {
        next(error);
    }
}

export const newPopup = async (req, res, next) => {
    try {
        const { name, bonusLink, image: imageUrl } = req.body;

        // First get the existing popup to delete its image from Cloudinary
        const existingPopup = await Popup.findOne({});
        
        // If there's an existing popup with Cloudinary image, delete it
        if (existingPopup?.imagePublicId) {
            await deleteFromCloudinary(existingPopup.imagePublicId);
        }

        let image;
        let imagePublicId;
        
        // Case 1: Direct image URL provided (skip Cloudinary)
        if (imageUrl && typeof imageUrl === 'string') {
            image = imageUrl;
            imagePublicId = null; // No public_id for direct URLs
        } 
        // Case 2: Image file uploaded (use Cloudinary)
        else if (req.file?.path) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return next(new ErrorHandler("Image upload failed", 500));
            }
            image = cloudinaryResponse.secure_url;
            imagePublicId = cloudinaryResponse.public_id;
        } 
        // Case 3: No image provided
        else {
            return next(new ErrorHandler("Image URL or file is required", 400));
        }

        // Delete the old popup if it exists
        await Popup.deleteMany({});

        // Create the new popup
        const newPopup = await Popup.create({
            name,
            bonusLink,
            image,
            imagePublicId
        });

        res.status(201).json({
            success: true,
            message: "Popup replaced successfully",
            newPopup,
        });
    } catch (error) {
        next(error);
    }
};

export const deletePopup = async (req, res, next) => {
    try {
        const existingPopup = await Popup.findOne({});
        
        if (existingPopup?.imagePublicId) {
            await deleteFromCloudinary(existingPopup.imagePublicId);
        }

        await Popup.deleteMany({});

        res.status(200).json({
            success: true,
            message: "Popup deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}