import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const assessSchema = z.object({
	answers: z.array(z.number()).min(5),
	goals: z.array(z.string()).optional()
});

export async function assess(req: Request, res: Response) {
	const user = (req as any).user as { id: string } | undefined;
	if (!user) return res.status(401).json({ error: 'Unauthorized' });
	const parsed = assessSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const { answers, goals } = parsed.data;
	// Simple heuristic scoring stub
	const techScore = answers.slice(0, Math.ceil(answers.length / 2)).reduce((a, b) => a + b, 0);
	const humanitiesScore = answers.slice(Math.ceil(answers.length / 2)).reduce((a, b) => a + b, 0);
	const recommended = techScore >= humanitiesScore ? ['Engineering', 'Computer Science'] : ['Law', 'Civil Services'];
	const assessment = await prisma.careerAssessment.create({ data: { userId: user.id, results: { answers, goals }, recommendations: { recommended } } });
	return res.status(201).json({ assessment });
}

export async function recommendations(req: Request, res: Response) {
	const user = (req as any).user as { id: string } | undefined;
	if (!user) return res.status(401).json({ error: 'Unauthorized' });
	const last = await prisma.careerAssessment.findFirst({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
	if (!last) return res.status(404).json({ error: 'No assessment found' });
	return res.json({ recommendations: last.recommendations });
}
