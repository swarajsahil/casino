import express from 'express';
import { getFAQs,createFAQ,updateFAQ,deleteFAQ, getFaqById } from "../controllers/faq.js";
const router = express.Router();

router.get("/faq",getFAQs);
router.get("/faq/:id", getFaqById);
router.post("/newFaq", createFAQ);
router.route("/faq/:id").put(updateFAQ)
.delete(deleteFAQ);

export default router;