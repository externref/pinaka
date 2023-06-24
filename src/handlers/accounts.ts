import { Request, Response } from "express";
import { Database } from "../database";
import { DBCache, createAccessToken, createSnowflake } from "../utils";

export interface UserInter {
	username: string;
	display_name: string;
	password: string;
}

export class AccountHandler {
	database: Database;
	cache: DBCache<string> = new DBCache();

	constructor(database: Database) {
		this.database = database;
	}

	async createAccount(req: Request<UserInter>, res: Response) {
		await this.database.pool.query(
			`
			INSERT INTO users
			VALUES ($1, $2, $3, $4, $5)
			`,
			[
				createSnowflake(),
				req.body.username,
				req.body.display_name,
				req.body.password,
				createAccessToken(),
			]
		);
		res.sendStatus(200);
	}
}
