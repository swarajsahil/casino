import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  isAdult: {
    type: Boolean,
    required: true
  },
  acceptsContact: {
    type: Boolean,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  unsubscribed: {
    type: Boolean,
    default: false
  },
  lastUpdated: Date
});
export const Subscription=mongoose.model("Subscription",SubscriptionSchema);