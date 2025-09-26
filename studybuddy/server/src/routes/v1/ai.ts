import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { explain } from '../../controllers/aiController';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.post('/explain', requireAuth, asyncHandler(explain));

export default router;