import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function requiz(req: Request, res: Response) {
	const user = (req as any).user as { id: string };
	if (!user) return res.status(401).json({ error: 'Unauthorized' });
	const weak = await prisma.topicStat.findMany({ where: { userId: user.id }, orderBy: { incorrect: 'desc' }, take: 3 });
	// Generate simple micro-practice items (placeholder)
	const questions = weak.map((t, idx) => ({
		id: `${t.topic}-${idx}`,
		prompt: `Practice question on ${t.topic}`,
		options: ['A', 'B', 'C', 'D'],
		answerIndex: 0,
		topic: t.topic,
		subject: t.subject
	}));
	return res.json({ questions });
}
