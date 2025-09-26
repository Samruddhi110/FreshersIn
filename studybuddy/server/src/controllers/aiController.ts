import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { saveExplanations } from '../services/explainService';

const explainSchema = z.object({
	attemptId: z.string().uuid(),
	items: z.array(
		z.object({
			questionId: z.string(),
			correctIndex: z.number().int(),
			selectedIndex: z.number().int(),
			subject: z.string(),
			topic: z.string(),
			prompt: z.string(),
			options: z.array(z.string()).min(2)
		})
	)
});

export async function explain(req: Request, res: Response) {
	const parsed = explainSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const { attemptId, items } = parsed.data;
	const attempt = await prisma.attempt.findUnique({ where: { id: attemptId } });
	if (!attempt) return res.status(404).json({ error: 'Attempt not found' });
	await saveExplanations(attemptId, items as any);
	return res.json({ ok: true });
}
