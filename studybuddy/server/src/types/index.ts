export type Role = 'student' | 'admin';

export interface JwtPayload {
	ip: string;
	id: string;
	email: string;
	role: Role;
	iat?: number;
	exp?: number;
}

export interface QuizQuestion {
	id: string;
	prompt: string;
	options: string[];
	answerIndex: number;
	topic: string;
	subject: string;
}

export interface QuizPayload {
	title: string;
	subject: string;
	topic: string;
	questions: QuizQuestion[];
}

export interface AttemptResponseItem {
	questionId: string;
	selectedIndex: number;
}

export interface ExplainResult {
	questionId: string;
	explanation: string;
	workedSolution: string;
}
