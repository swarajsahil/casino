import mongoose from "mongoose";

const schema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters'],
    maxlength: [500, 'Question cannot exceed 500 characters']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true,
    minlength: [20, 'Answer must be at least 20 characters'],
    maxlength: [2000, 'Answer cannot exceed 2000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
);

// Create the Faq model
export const faq = mongoose.model('faq', schema);