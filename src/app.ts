import express, { Express, Request, Response } from "express";
import { Endpoints } from "./endpoints";
import { GitaHandler } from "./handlers/gita";
import { Database } from "./database";
export const app: Express = express();
export const database = new Database();
export const gitaHandler = new GitaHandler(database);
app.use("/static", express.static("static"));
app.get(Endpoints.home, (_req: Request, res: Response) => {
	res.sendFile("static/templates/home.html", { root: "./" });
});
app.get(Endpoints.bhagavadgita, async (req: Request, res: Response) => {
	let adhyaya: string = req.params.adhyaya;
	let shloka: string = req.params.shloka;
	res.send(await gitaHandler.getShloka(parseInt(adhyaya), parseInt(shloka)));
});
app.get(Endpoints.bhagavadgita_home, (_req: Request, res: Response) => {
	res.sendFile("static/templates/gita.html", { root: "./" });
});
app.get(Endpoints.bhagavadgita_shloka, (_req: Request, res: Response) => {
	res.sendFile("static/templates/gitashloka.html", { root: "./" });
});
