import mongoose from 'mongoose';

// Define the Blog Schema
const schema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keyTakeaways: {
    type: [String],  // Store an array of key takeaways
    required: true,
  },
  content: {
    type: [String],  // Store an array of content parts
    required: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
},
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Blog model
export const Blog = mongoose.model('blogs', schema);
