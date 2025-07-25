import { Subscription } from "../models/subscription.js";

export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    const result = await Subscription.findOneAndUpdate(
      { email, unsubscribed: false },
      { unsubscribed: true, lastUpdated: Date.now() },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Email not found or already unsubscribed' });
    }

    res.json({ message: 'Unsubscribed successfully' });
  } catch (err) {
    console.error('Unsubscription error:', err);
    res.status(500).json({ message: 'Server error during unsubscription' });
  }
};