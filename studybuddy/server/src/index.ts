import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { registerRoutes } from './routes/registerRoutes';

const app = express();
const logger = pino({ transport: { target: 'pino-pretty' } });
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger }));

registerRoutes(app);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
	logger.info(`Server listening on http://localhost:${port}`);
});
