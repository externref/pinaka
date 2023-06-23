import { app, database } from "./app";
import winston from "winston";
const { combine, timestamp, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

export const logger = winston.createLogger({
	format: combine(timestamp(), myFormat),
	level: "info",
	defaultMeta: { service: "vedic" },
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "logs/error.log",
			level: "error",
			format: winston.format.json(),
		}),
		new winston.transports.File({ filename: "logs/logging.log", format: winston.format.json() }),
	],
});

app.listen(8000, async () => {
	await database.setup();
	logger.info("Started listening on port 8000");
});
