import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function getWrongQuestions(req: Request, res: Response) {
	const { id } = req.params;
	const attempts = await prisma.attempt.findMany({
		where: { userId: id },
		include: { explanations: true, quiz: true }
	});
	const wrong = attempts.flatMap((a) => a.explanations.map((e) => ({ attemptId: a.id, questionId: e.questionId, subject: (a.quiz.questions as any[]).find((q) => q.id === e.questionId)?.subject, topic: (a.quiz.questions as any[]).find((q) => q.id === e.questionId)?.topic, explanation: e.text, worked: e.worked }))
	);
	return res.json({ items: wrong });
}
