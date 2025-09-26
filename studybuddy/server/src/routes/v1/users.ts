import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { getWrongQuestions } from '../../controllers/usersController';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.get('/:id/wrong-questions', requireAuth, asyncHandler(getWrongQuestions));

export default router;