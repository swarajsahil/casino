import mongoose from "mongoose";


const casinoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bonus: {
    type: String,
    required: true,
    default: "No bonus available",
  }, // Optional bonus field
  image: {
    type: String,
    required: [true, "Image is required"],
}, // URL or file path
  pros: [String], // Array of strings (e.g., ["Fast", "Reliable"])
  freeSpins: {
    type: Number,
    required: true,
  },
  bonusLink:{
    type: String,
    required: true,
  },
  casinoLink:{
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
  // Optional: Timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Casino =  mongoose.model('casinos', casinoSchema);