import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { requiz } from '../../controllers/practiceController';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.get('/requiz', requireAuth, asyncHandler(requiz));

export default router;