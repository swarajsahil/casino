import ErrorHandler from "../middlewares/error.js";
import { uploadOnCloudinary ,deleteFromCloudinary} from "../utils/cloudinary.js";
import { Games } from "../models/games.js";

export const allGames = async (req, res, next) => {
    try {
        const games = await Games.find({});
        res.status(200).json({
            success: true,
            games
        });
    } catch (error) {
        next(error);
    }
}

// getGameById
export const getGameById = async (req, res, next) => {
    try {
      const { id } = req.params;  // Get the ID from the URL parameter
  
      // Find the blog by ID
      const games = await Games.findById(id);
      if (!games) {
        return next(new ErrorHandler("Game not found", 404));  // If no blog is found, return an error
      }
  
      res.status(200).json({
        success: true,
        games,  // Return the found blog
      });
    } catch (error) {
      next(error);  // Pass the error to the error handler
    }
  };
  
  export const addGame = async (req, res, next) => {
      try {
          const { gameName, description, gameLink, dealer, company, image: imageUrl } = req.body;
  
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
  
          const newGame = await Games.create({
              gameName,
              description,
              gameLink,
              dealer,
              company,
              image,
              imagePublicId
          });
  
          res.status(201).json({
              success: true,
              message: "Game added successfully",
              newGame,
          });
      } catch (error) {
          next(error);
      }
  };
  
  export const updateGame = async (req, res, next) => {
      try {
          const { id } = req.params;
          const { gameName, description, gameLink, dealer, company } = req.body;
  
          const game = await Games.findById(id);
          if (!game) return next(new ErrorHandler("Game not found", 404));
  
          // Handle image update
          let newImage = game.image;
          let newPublicId = game.imagePublicId;
  
          if (req.file?.path) {
              const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
              if (!cloudinaryResponse) {
                  return next(new ErrorHandler("Image upload failed", 500));
              }
              newImage = cloudinaryResponse.secure_url;
              newPublicId = cloudinaryResponse.public_id;
  
              // Delete old image from Cloudinary
              if (game.imagePublicId) {
                  await deleteFromCloudinary(game.imagePublicId);
              }
          }
  
          const updatedData = {
              gameName: gameName || game.gameName,
              description: description || game.description,
              gameLink: gameLink || game.gameLink,
              dealer: dealer || game.dealer,
              company: company || game.company,
              image: newImage,
              imagePublicId: newPublicId
          };
  
          const updatedGame = await Games.findByIdAndUpdate(id, updatedData, {
              new: true,
              runValidators: true
          });
  
          res.status(200).json({
              success: true,
              message: "Game updated successfully",
              game: updatedGame,
          });
      } catch (error) {
          next(error);
      }
  };
  
  export const deleteGame = async (req, res, next) => {
      try {
          const { id } = req.params;
          const game = await Games.findById(id);
          if (!game) return next(new ErrorHandler("Invalid Id", 404));
  
          // Delete Cloudinary image if exists
          if (game.imagePublicId) {
              await deleteFromCloudinary(game.imagePublicId);
          }
  
          await game.deleteOne();
  
          res.status(200).json({
              success: true,
              message: "Game Deleted"
          });
      } catch (error) {
          next(error);
      }
  };