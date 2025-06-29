import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
},
  bonusLink: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Popup model
export const Popup = mongoose.model('pop', schema);
