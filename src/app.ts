import express, { Express, Request, Response } from "express";
import { Endpoints } from "./endpoints";
import { GitaHandler, GitaQuery, numShlokas } from "./handlers/gita";
import { Database } from "./database";
import bodyParser from "body-parser";
import { AccountHandler, LoginAttempt, UserInter } from "./handlers/accounts";
import { logger } from ".";
import cors from "cors";

export const app: Express = express();
export const database = new Database();
export const gitaHandler = new GitaHandler(database);
export const accountHandler = new AccountHandler(database);

app.use("/static", express.static("static"));
app.use(bodyParser.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);
app.get(Endpoints.home, (_req: Request, res: Response) => {
	res.sendFile("static/templates/home.html", { root: "./" });
});

app.get(Endpoints.docs, (_req: Request, res: Response) => {
	res.redirect("https://externref.github.io/vedic");
});
app.get(Endpoints.github, (_req: Request, res: Response) => {
	res.redirect("https://github.com/externref/vedic");
});
app.get(Endpoints.discord, (_req: Request, res: Response) => {
	res.redirect("https://discord.gg/WabTsHbqFM");
});

app.post(Endpoints.create_account, (req: Request<UserInter>, res: Response) => {
	accountHandler.createAccount(req, res);
});

app.post(Endpoints.verify_login, (req: Request<LoginAttempt>, res) => {
	accountHandler.verifyLogin(req, res);
});

app.post(Endpoints.verify_cookie, (req: Request, res: Response) => {
	accountHandler.verifyCookie(req, res);
});

app.get(Endpoints.bhagavadgita, async (req: Request, res: Response) => {
	let adhyaya: string = req.params.adhyaya;
	let shloka: string = req.params.shloka;
	if (shloka > numShlokas[adhyaya]) {
		return res.sendStatus(404);
	}
	try {
		res.send(await gitaHandler.getShloka(parseInt(adhyaya), parseInt(shloka)));
	} catch (err) {
		res.status(108).send("Under development");
		logger.error(err);
	}
});

app.post(Endpoints.insert_gita_shloka, async (req: Request, res: Response) => {
	if (req.body.password != process.env.ADMIN_PASS) {
		return res.sendStatus(403);
	}
	await database.addGitaShloka(req.body);
	res.sendStatus(200);
});
app.post(Endpoints.bhagavadgita_query, (req: Request<GitaQuery>, res: Response) => {
	gitaHandler.query(req, res);
});
