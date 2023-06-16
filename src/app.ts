import express, { Express, Request, Response } from "express";
import { Endpoints } from "./endpoints";
import { GitaHandler } from "./handlers/gita";
export const app: Express = express();
const gitaHandler = new GitaHandler();
app.use("/static", express.static("static"));
app.get(Endpoints.home, (_req: Request, res: Response) => {
	res.sendFile("static/templates/home.html", { root: "./" });
});
app.get(Endpoints.bhagwadgita, (req: Request, res: Response) => {
	let adhyaya: string = req.params.adhyaya;
	let shloka: string = req.params.shloka;
	res.send(gitaHandler.getShloka(parseInt(adhyaya), parseInt(shloka)));
});
