import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: [true, "Game name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    gameLink:{
        type: String,
        required: true,
      },
    dealer: {
        type: String,
        required: [true, "Dealer name is required"],
    },
    company: {
        type: String,
        required: [true, "Company is required"],
    },  
    createdAt : {
    type: Date,
    default: Date.now,
    }
});

export const Games = mongoose.model("games", gameSchema);