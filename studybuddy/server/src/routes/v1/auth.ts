import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { login, me, register } from '../../controllers/authController';
import { requireAuth } from '../../middleware/auth';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/me', requireAuth, asyncHandler(me));

export default router;