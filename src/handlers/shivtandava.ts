import { QueryResult } from "pg";
import { Database } from "../database";
import { Request, Response } from "express";

export interface TandavaShloka {
	khand: number;
	shloka: number;
	original: string;
	romanised: string;
	hindi: string;
	english: string;
}

export interface TandavaQuery {
	from: number;
	to: number;
	all: boolean;
}

export class TandavaHandler {
	database: Database;
	constructor(db: Database) {
		this.database = db;
	}
	async getShloka(req: Request, res: Response) {
		let shloka = req.url.split("/").at(-1);
		let query = await this.database.pool.query<TandavaShloka>(
			`
	       SELECT * FROM shivtandava
	       WHERE shloka = $1
	       `,
			[shloka]
		);
		if (!query.rowCount) {
			return res.sendStatus(404);
		}
		return query.rows[0];
	}
	async addShloka(req: Request<TandavaShloka>, res: Response) {
		let shloka: TandavaShloka = req.body;
		await this.database.pool.query(
			`
			INSERT INTO shivtandava
			($1, $2, $3, $4, $5, $6)
			`,
			[
				shloka.khand,
				shloka.shloka,
				shloka.original,
				shloka.romanised,
				shloka.hindi,
				shloka.english,
			]
		);
		res.sendStatus(200);
	}
	async query(req: Request<TandavaQuery>, res: Response<TandavaShloka[]>) {
		if (req.body.all) {
			res.send(
				(await this.database.pool.query<TandavaShloka>(`SELECT * FROM shivtandava`)).rows
			);
		} else {
			let query = await this.database.pool.query<TandavaShloka>(
				`
				SELECT * FROM shivtandava
				WHERE shloka > $1 AND shloka < $2
				`,
				[req.body.from || 0, req.body.to || 0]
			);
			return res.send(query.rows);
		}
	}
}
