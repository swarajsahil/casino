import express from 'express';
import {
  getPromotions,
  updatePromotion,
  deletePromotion,
  seedPromotions,
  getPromotionById,
  newPromotion
} from '../controllers/promotion.js';
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.route('/')
  .get(getPromotions)
  .post(upload.single("image"),newPromotion);

router.route('/:id')
  .get(getPromotionById)
  .put(upload.single("image"),updatePromotion)
  .delete(deletePromotion);

router.post('/seed', seedPromotions);

export default router;