import mongoose from "mongoose";


const casinoSchema = new mongoose.Schema({
  topPosition: {
    type: Number,
    min: 1,
    max: 10,
    required: false,
    default: null,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  stats: {
    type: {
      Founded: Number,
      licenses: Number,
      games: Number,
      payments: Number,
      bonuses: Number,
      countries: Number,
      software: Number,
      currencies: Number,
      languages: Number
    },
    _id: false, // This disables the automatic _id for the stats object
    required: false // Make it optional
  },
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
rating: {
    type: Number,
    required: true,
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