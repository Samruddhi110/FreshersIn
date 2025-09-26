import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthUser { id: string; role: 'student' | 'admin'; }

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const header = req.headers.authorization;
	if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
	const token = header.substring(7);
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
		(req as any).user = decoded as AuthUser;
		return next();
	} catch {
		return res.status(401).json({ error: 'Invalid token' });
	}
}
