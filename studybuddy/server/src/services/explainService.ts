import { prisma } from '../lib/prisma';
import { z } from 'zod';

const explanationItemSchema = z.object({
	questionId: z.string(),
	correctIndex: z.number().int(),
	selectedIndex: z.number().int(),
	subject: z.string(),
	topic: z.string(),
	prompt: z.string(),
	options: z.array(z.string()).min(2)
});

const aiResponseSchema = z.object({
	items: z.array(z.object({
		questionId: z.string(),
		explanation: z.string().min(1),
		workedSolution: z.string().min(1)
	}))
});

async function callOpenAI(items: z.infer<typeof explanationItemSchema>[]): Promise<{ questionId: string; explanation: string; workedSolution: string }[]> {
	const apiKey = process.env.OPENAI_API_KEY || '';
	if (!apiKey) {
		return items.map((x) => ({ questionId: x.questionId, explanation: `Explanation for ${x.questionId} not available.`, workedSolution: `Worked solution for ${x.questionId} not available.` }));
	}
	// Fallback-safe mock; integrate OpenAI client here if desired
	return items.map((x) => ({ questionId: x.questionId, explanation: `Why the correct answer is ${x.correctIndex}.`, workedSolution: `Step-by-step reasoning for ${x.questionId}.` }));
}

export async function saveExplanations(attemptId: string, mistakes: z.infer<typeof explanationItemSchema>[]) {
	const ai = await callOpenAI(mistakes);
	const validated = aiResponseSchema.parse({ items: ai });
	await prisma.$transaction(
		validated.items.map((it) =>
			prisma.explanation.create({ data: { attemptId, questionId: it.questionId, text: it.explanation, worked: it.workedSolution } })
		)
	);
}
