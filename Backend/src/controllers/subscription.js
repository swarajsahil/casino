import { Subscription } from "../models/subscription.js";

// Controller to handle fetching all blogs
export const allSubscribers = async (req, res, next) => {
    try {
        const subscriber = await Subscription.find({});
        res.status(200).json({
            success: true,
            subscriber,
        });
    } catch (error) {
        next(error);
    }
};


export const subscribe = async (req, res) => {
  try {
    const { email, adult, contact } = req.body;
    
    // Check if already subscribed and not unsubscribed
    const existing = await Subscription.findOne({ email, unsubscribed: false });
    if (existing) {
      return res.status(409).json({ message: 'This email is already subscribed' });
    }

    const subscription = new Subscription({
      email,
      isAdult: adult,
      acceptsContact: contact,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await subscription.save();

    // In a real app, you would send a confirmation email here
    // console.log(`New subscription: ${email}`);

    res.status(201).json({ message: 'Subscription successful' });
  } catch (err) {
    console.error('Subscription error:', err);
    res.status(500).json({ message: 'Server error during subscription' });
  }
};

// DELETE BLOG
export const deleteSubscriber = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subscriber = await Subscription.findById(id);
        if (!subscriber) return next(new ErrorHandler("Invalid Id", 404));


        await subscriber.deleteOne();

        res.status(200).json({
            success: true,
            message: "Subscriber Deleted"
        });
    } catch (error) {
        next(error);
    }
};