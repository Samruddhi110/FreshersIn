import { prisma } from '../lib/prisma';

export async function updateTopicStats(userId: string, questions: any[], responses: { questionId: string; selectedIndex: number }[]) {
	const byId = new Map<string, any>(questions.map((q) => [q.id, q]));
	for (const r of responses) {
		const q = byId.get(r.questionId);
		if (!q) continue;
		const isCorrect = q.answerIndex === r.selectedIndex;
		await prisma.topicStat.upsert({
			where: { userId_subject_topic: { userId, subject: q.subject, topic: q.topic } },
			create: { userId, subject: q.subject, topic: q.topic, correct: isCorrect ? 1 : 0, incorrect: isCorrect ? 0 : 1, streak: isCorrect ? 1 : 0 },
			update: {
				correct: { increment: isCorrect ? 1 : 0 },
				incorrect: { increment: isCorrect ? 0 : 1 },
				streak: isCorrect ? { increment: 1 } : 0
			}
		});
	}
}
