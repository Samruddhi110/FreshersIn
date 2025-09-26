import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { JwtPayload } from '../types';

const registerSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(8)
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

function signToken(payload: JwtPayload): string {
	return jwt.sign(payload, process.env.JWT_SECRET || 'changeme', { expiresIn: '7d' });
}

export async function register(req: Request, res: Response) {
	const parsed = registerSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const { email, name, password } = parsed.data;
	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) return res.status(409).json({ error: 'Email already registered' });
	const hashed = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({ data: { email, name, password: hashed } });
	const token = signToken({ ip: req.ip, id: user.id, email: user.email, role: (user.role as any) || 'student' });
	return res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}

export async function login(req: Request, res: Response) {
	const parsed = loginSchema.safeParse(req.body);
	if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
	const { email, password } = parsed.data;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) return res.status(401).json({ error: 'Invalid credentials' });
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
	const token = signToken({ ip: req.ip, id: user.id, email: user.email, role: (user.role as any) || 'student' });
	return res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}

export async function me(req: Request, res: Response) {
	const user = (req as any).user as JwtPayload | undefined;
	if (!user) return res.status(401).json({ error: 'Unauthorized' });
	const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { id: true, email: true, name: true, role: true } });
	return res.json({ user: dbUser });
}
