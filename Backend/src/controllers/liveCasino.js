import ErrorHandler from "../middlewares/error.js";
import { uploadOnCloudinary , deleteFromCloudinary} from "../utils/cloudinary.js";
import { Casino } from "../models/liveCasino.js";

export const allCasino = async (req, res, next) => {
    try {
        const casinos = await Casino.find({});
        res.status(200).json({
            success: true,
            casinos
        });
    } catch (error) {
        next(error);
    }
}

export const getCasinoById = async (req, res, next) => {
    try {
      const { id } = req.params;  // Get the ID from the URL parameter
  
      // Find the blog by ID
      const casinos = await Casino.findById(id);
      if (!casinos) {
        return next(new ErrorHandler("Casino not found", 404));  // If no blog is found, return an error
      }
  
      res.status(200).json({
        success: true,
        casinos,  // Return the found blog
      });
    } catch (error) {
      next(error);  // Pass the error to the error handler
    }
  };


export const addCasino = async (req, res, next) => {
    try {
        const { name, description, bonus, pros, casinoLink, bonusLink, dealer, company,rating,freeSpins, image: imageUrl,
            // Add these new fields:
            topPosition,
            founded,
            licenses,
            games,
            payments,
            bonuses,
            countries,
            software,
            currencies,
            languages
         } = req.body;

        let image;
        let imagePublicId = null;

        // Add this to your addCasino and updateCasino functions
        if (topPosition) {
            const existing = await Casino.findOne({ topPosition });
            if (existing && existing._id.toString() !== id) {
                return next(new ErrorHandler(`Position ${topPosition} is already taken`, 400));
            }
        }

        if (imageUrl && typeof imageUrl === 'string') {
            image = imageUrl;
        } else if (req.file?.path) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return next(new ErrorHandler("Image upload failed", 500));
            }
            image = cloudinaryResponse.secure_url;
            imagePublicId = cloudinaryResponse.public_id; // Store public_id
        } else {
            return next(new ErrorHandler("Image URL or file is required", 400));
        }

        // Create stats object if any stat field is provided
        let stats = null;
        if (founded || licenses || games || payments || bonuses || countries || software || currencies || languages) {
            stats = {
                Founded: founded || 0,
                licenses: licenses || 0,
                games: games || 0,
                payments: payments || 0,
                bonuses: bonuses || 0,
                countries: countries || 0,
                software: software || 0,
                currencies: currencies || 0,
                languages: languages || 0
            };
        }

        const newCasino = await Casino.create({
            name,
            description,
            bonus,
            pros: pros?.split(",").map(p => p.trim()),
            rating,
            freeSpins,
            casinoLink,
            bonusLink,
            dealer,
            company,
            image,
            imagePublicId, // Store public ID in database
            stats,
            topPosition: topPosition || null
        });

        res.status(201).json({
            success: true,
            message: "Casino added successfully",
            newCasino,
        });
    } catch (error) {
        next(error);
    }
};


export const updateCasino = async (req, res, next) => {
    try {
        const { id } = req.params;
        const casino = await Casino.findById(id);
        if (!casino) {
            return next(new ErrorHandler("Casino not found", 404));
        }
        const {
            founded,
            licenses,
            games,
            payments,
            bonuses,
            countries,
            software,
            currencies,
            languages,
            topPosition
        } = req.body;

        if (topPosition !== undefined) { // check for undefined, not truthy
            // If setting to a position (not null/undefined)
            if (topPosition) {
                const existing = await Casino.findOne({ topPosition });
                if (existing && existing._id.toString() !== id) {
                    return next(new ErrorHandler(`Position ${topPosition} is already taken`, 400));
                }
            }
        }

        // Update stats if any stat field is provided
        let stats = casino.stats || null;
        if (founded || licenses || games || payments || bonuses || countries || software || currencies || languages) {
            stats = {
                Founded: founded || casino.stats?.Founded || 0,
                licenses: licenses || casino.stats?.licenses || 0,
                games: games || casino.stats?.games || 0,
                payments: payments || casino.stats?.payments || 0,
                bonuses: bonuses || casino.stats?.bonuses || 0,
                countries: countries || casino.stats?.countries || 0,
                software: software || casino.stats?.software || 0,
                currencies: currencies || casino.stats?.currencies || 0,
                languages: languages || casino.stats?.languages || 0
            };
        }

        // Handle image update
        let newImage = casino.image;
        let newPublicId = casino.imagePublicId;

        if (req.file?.path) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResponse) {
                return next(new ErrorHandler("Image upload failed", 500));
            }
            newImage = cloudinaryResponse.secure_url;
            newPublicId = cloudinaryResponse.public_id;
            
            // Delete old image
            if (casino.imagePublicId) {
                await deleteFromCloudinary(casino.imagePublicId);
            }
        }

        // Update casino data
        const updatedData = {
            name: req.body.name || casino.name,
            description: req.body.description || casino.description,
            bonus: req.body.bonus || casino.bonus,
            pros: req.body.pros ? req.body.pros.split(",").map(p => p.trim()) : casino.pros,
            casinoLink: req.body.casinoLink || casino.casinoLink,
            bonusLink: req.body.bonusLink || casino.bonusLink,
            dealer: req.body.dealer || casino.dealer,
            company: req.body.company || casino.company,
            freeSpins: req.body.freeSpins || casino.freeSpins,
            rating: req.body.rating || casino.rating,
            image: newImage,
            imagePublicId: newPublicId,
            topPosition: req.body.topPosition || casino.topPosition,
            stats
        };

        const updatedCasino = await Casino.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: "Casino updated successfully",
            casino: updatedCasino,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCasino = async (req, res, next) => {
    try {
        const { id } = req.params;
        const casino = await Casino.findById(id);

        if (!casino) {
            return next(new ErrorHandler("Invalid Id", 404));
        }

        // Delete Cloudinary image if exists
        if (casino.imagePublicId) {
            await deleteFromCloudinary(casino.imagePublicId);
        }

        await Casino.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: "Casino Deleted"
        });
    } catch (error) {
        next(error);
    }
};
export const topCasinos = async (req, res, next) => {
  try {
    const casinos = await Casino.find({ topPosition: { $ne: null } })
                              .sort({ topPosition: 1 })
                              .limit(10);
    res.status(200).json({
      success: true,
      casinos
    });
  } catch (error) {
    next(error);
  }
}