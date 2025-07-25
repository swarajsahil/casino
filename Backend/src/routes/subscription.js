import express from 'express';
import { validateSubscription, validate } from '../middlewares/validateSubscription.js';
import limiter from '../utils/rateLimiter.js';
import { allSubscribers, deleteSubscriber, subscribe } from '../controllers/subscription.js';
import { unsubscribe } from '../controllers/unsubscribe.js';

const router = express.Router();

// GET /api/all - get all subscribe user
router.get("/subscriber/all", allSubscribers);

// POST /api/subscribe - Create new subscription
router.post('/subscribe', limiter, validateSubscription, validate, subscribe);

// POST /api/unsubscribe - Unsubscribe user
router.post('/unsubscribe', limiter, unsubscribe);


router.delete("/subscriber/:id",deleteSubscriber);

export default router;