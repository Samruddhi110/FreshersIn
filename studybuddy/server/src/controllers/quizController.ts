import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import { AttemptResponseItem, QuizPayload } from '../types';
import { updateTopicStats } from '../services/topicService';
import { saveExplanations } from '../services/explainService';

const quizCreateSchema = z.object({
	title: z.string().min(1),
	subject: z.string().min(1),
	topic: z.string().min(1),
	questions: z.array(
		z.object({
			id: z.string().min(1),
			prompt: z.string().min(1),
			options: z.array(z.string()).min(2),
			answerIndex: z.number().int().min(0),
			topic: z.string().min(1),
			subject: z.string().min(1)
		})
	).min(1)
});

export async function createQuiz(req: Request, res: Response) {
	const parsed = quizCreateSchema.safeParse(req.body as QuizPayload);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const quiz = await prisma.quiz.create({ data: parsed.data });
	return res.status(201).json({ quiz });
}

const submitSchema = z.object({
	quizId: z.string().uuid(),
	responses: z.array(z.object({ questionId: z.string(), selectedIndex: z.number().int() })).min(1)
});

export async function submitAttempt(req: Request, res: Response) {
	const user = (req as any).user as { id: string };
	if (!user) return res.status(401).json({ error: 'Unauthorized' });
	const parsed = submitSchema.safeParse(req.body as { quizId: string; responses: AttemptResponseItem[] });
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const { quizId, responses } = parsed.data;
	const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
	if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
	const questions = quiz.questions as any[];
	const answerMap = new Map<string, number>(questions.map((q: any) => [q.id, q.answerIndex]));
	let correct = 0;
	const mistakes: { questionId: string; correctIndex: number; selectedIndex: number; subject: string; topic: string; prompt: string; options: string[] }[] = [];
	for (const r of responses) {
		const ans = answerMap.get(r.questionId);
		const q = questions.find((x: any) => x.id === r.questionId);
		if (ans === r.selectedIndex) correct++;
		else if (typeof ans === 'number' && q) mistakes.push({ questionId: r.questionId, correctIndex: ans, selectedIndex: r.selectedIndex, subject: q.subject, topic: q.topic, prompt: q.prompt, options: q.options });
	}
	const score = Math.round((correct / questions.length) * 100);
	const attempt = await prisma.attempt.create({ data: { userId: user.id, quizId, score, responses } });
	await updateTopicStats(user.id, questions, responses);
	if (mistakes.length > 0) {
		await saveExplanations(attempt.id, mistakes);
	}
	return res.status(201).json({ attemptId: attempt.id, score, total: questions.length, correct, mistakesCount: mistakes.length });
}

export async function getAnalytics(req: Request, res: Response) {
	const user = (req as any).user as { id: string };
	if (!user) return res.status(401).json({ error: 'Unauthorized' });
	const attempts = await prisma.attempt.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, take: 50 });
	const topics = await prisma.topicStat.findMany({ where: { userId: user.id } });
	return res.json({ attempts, topics });
}
