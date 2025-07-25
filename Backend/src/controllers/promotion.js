import { Promotion } from "../models/Promotion.js";
import { processData } from "../utils/dataService.js";
import ErrorHandler from "../middlewares/error.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";



// Controller to handle fetching all promotions (active and inactive)
export const getPromotions = async (req, res, next) => {
    try {
        const promotions = await Promotion.find({});
        res.status(200).json({
            success: true,
            promotions,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to fetch a promotion by its ID
export const getPromotionById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const promotion = await Promotion.findById(id);
        if (!promotion) {
            return next(new ErrorHandler("Promotion not found", 404));
        }

        res.status(200).json({
            success: true,
            promotion,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to handle creating a new promotion
export const newPromotion = async (req, res, next) => {
    try {
    //   console.log(req.body);
      
        const { title, bonus, description, Bonuslink, image: imageUrl } = req.body;

        if (!title || !bonus || !description || !Bonuslink) {
            return next(new ErrorHandler("Title, bonus, description, and Bonuslink are required", 400));
        }

        // const processedDescription = processData(description, 40);

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

        const promotion = await Promotion.create({
            title,
            bonus,
            description,
            Bonuslink,
            image,
            isActive: false, // Default to inactive
        });

        res.status(201).json({
            success: true,
            message: "Promotion added successfully",
            promotion,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to update a promotion
// Controller to update a promotion
export const updatePromotion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, bonus, description, Bonuslink, image: imageUrl } = req.body;

        const promotion = await Promotion.findById(id);
        if (!promotion) return next(new ErrorHandler("Promotion not found", 404));

        // Update text fields
        if (description) promotion.description = description;
        if (title) promotion.title = title;
        if (bonus) promotion.bonus = bonus;
        if (Bonuslink) promotion.Bonuslink = Bonuslink;

        // Handle image update - three possible cases:
        // 1. New file uploaded (via multipart/form-data)
        // 2. New image URL provided (via JSON body)
        // 3. Neither - keep existing image
        if (req.file?.path) {
            // Case 1: File upload
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return next(new ErrorHandler("Image upload failed", 500));
            }

            // Delete old image from Cloudinary if it exists
            if (promotion.imagePublicId) {
                await deleteFromCloudinary(promotion.imagePublicId);
            }

            promotion.image = cloudinaryResponse.secure_url;
            promotion.imagePublicId = cloudinaryResponse.public_id;
        } else if (imageUrl && typeof imageUrl === 'string') {
            // Case 2: New image URL provided
            // Only update if the URL is different from current image
            if (imageUrl !== promotion.image) {
                // Delete old image from Cloudinary if it exists
                if (promotion.imagePublicId) {
                    await deleteFromCloudinary(promotion.imagePublicId);
                }
                
                promotion.image = imageUrl;
                promotion.imagePublicId = null; // No public ID for external URLs
            }
        }
        // Case 3: No image update - keep existing image

        await promotion.save();

        res.status(200).json({
            success: true,
            message: "Promotion updated successfully",
            promotion,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to delete a promotion
export const deletePromotion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findById(id);
        if (!promotion) return next(new ErrorHandler("Invalid Id", 404));

        if (promotion.imagePublicId) {
            await deleteFromCloudinary(promotion.imagePublicId);
        }

        await promotion.deleteOne();

        res.status(200).json({
            success: true,
            message: "Promotion Deleted"
        });
    } catch (error) {
        next(error);
    }
};

// Controller to activate a promotion
export const activatePromotion = async (req, res, next) => {
    try {
        const { id } = req.params;

        const promotion = await Promotion.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true }
        );

        if (!promotion) {
            return next(new ErrorHandler("Promotion not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Promotion activated successfully",
            promotion,
        });
    } catch (error) {
        next(error);
    }
};

// Controller to seed initial promotions
export const seedPromotions = async (req, res, next) => {
    try {
        // Clear existing promotions
        await Promotion.deleteMany();

        // Insert sample promotions
        const promotions = [
            {
                title: "MEGA JACKPOT BONUS",
                bonus: "200% UP TO $1000",
                description: "Claim your massive welcome package with our exclusive Mega Jackpot Bonus. Perfect for high rollers looking to maximize their playtime!",
                terms: ["Minimum deposit $20", "Wagering requirement 40x", "Valid for 30 days"],
                image: "https://a.omappapi.com/users/4e11541cdfb6/images/ea4cf2e1025b1735596138-Stake-Casino.png",
                Bonuslink: "http://bonus.com",
                isActive: true
            },
            {
                title: "WELCOME PACKAGE",
                bonus: "150% UP TO $500",
                description: "New players get an amazing welcome package to start their journey with extra funds!",
                terms: ["Minimum deposit $10", "Wagering requirement 35x", "Valid for new players only"],
                image: "https://example.com/welcome-bonus.jpg",
                Bonuslink: "http://welcome.com",
                isActive: true
            },
            {
                title: "WEEKLY RELOAD",
                bonus: "50% UP TO $200",
                description: "Get a weekly boost to your bankroll with our reload bonus!",
                terms: ["Available every Monday", "Wagering requirement 30x", "Maximum bonus $200"],
                image: "https://example.com/reload-bonus.jpg",
                Bonuslink: "http://reload.com",
                isActive: true
            }
        ];

        const createdPromotions = await Promotion.insertMany(promotions);

        res.status(201).json({
            success: true,
            message: "Promotions seeded successfully",
            count: createdPromotions.length,
            promotions: createdPromotions
        });
    } catch (error) {
        next(error);
    }
};