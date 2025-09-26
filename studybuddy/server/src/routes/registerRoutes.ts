import { Express } from 'express';
import authRouter from './v1/auth';
import quizRouter from './v1/quiz';
import aiRouter from './v1/ai';
import practiceRouter from './v1/practice';
import usersRouter from './v1/users';
import careerRouter from './v1/career';

export function registerRoutes(app: Express) {
	app.get('/health', (_req, res) => res.json({ ok: true }));
	app.use('/api/auth', authRouter);
	app.use('/api/quiz', quizRouter);
	app.use('/api/openai', aiRouter);
	app.use('/api/practice', practiceRouter);
	app.use('/api/users', usersRouter);
	app.use('/api/career', careerRouter);
}
