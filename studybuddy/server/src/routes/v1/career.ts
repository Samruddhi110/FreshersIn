import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { assess, recommendations } from '../../controllers/careerController';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.post('/assess', requireAuth, asyncHandler(assess));
router.get('/recommendations', requireAuth, asyncHandler(recommendations));

export default router;