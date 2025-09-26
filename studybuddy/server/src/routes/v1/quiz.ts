import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { createQuiz, getAnalytics, submitAttempt } from '../../controllers/quizController';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.post('/', requireAuth, asyncHandler(createQuiz));
router.post('/submit', requireAuth, asyncHandler(submitAttempt));
router.get('/analytics', requireAuth, asyncHandler(getAnalytics));

export default router;