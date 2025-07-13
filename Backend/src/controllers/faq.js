import ErrorHandler from '../middlewares/error.js';
import {faq} from '../models/faq.js';

export const getFAQs = async (req, res,next) => {
  try {
    const faqs = await faq.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    next(error);
  }
};

// Controller to fetch a faq by its ID
export const getFaqById = async (req, res, next) => {
    try {
      const { id } = req.params;  // Get the ID from the URL parameter
  
      // Find the blog by ID
      const faqs = await faq.findById(id);
      if (!faqs) {
        return next(new ErrorHandler("Faq not found", 404));  // If no blog is found, return an error
      }
  
      res.status(200).json({
        success: true,
        faqs,  // Return the found faq
      });
    } catch (error) {
      next(error);  // Pass the error to the error handler
    }
  };

export const createFAQ = async (req, res,next) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
            return next(new ErrorHandler("question and answer are required", 400));
        }
    const newFaq = await faq.create({ question, answer });
    
    res.status(201).json({
      success: true,
      data: newFaq
    });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req, res,next) => {
    try {
        const { id } = req.params;
        const { question, answer} = req.body;

        const faqs = await faq.findById(id);
        if (!faq) return next(new ErrorHandler("Blog not found", 404));

        if (question) faq.question = question;
        if (answer) faq.answer = answer;

        await faq.save();

        res.status(200).json({
            success: true,
            message: "Faq updated successfully",
            faqs,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteFAQ = async (req, res,next) => {
  try {
    const { id } = req.params;
    const faqs = await faq.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        error: 'FAQ not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};