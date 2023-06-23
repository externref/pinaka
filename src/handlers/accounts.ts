import { Request, Response } from "express";
import { Database } from "../database";
import { DBCache } from "../utils";

class AccountHandler {
	database: Database;
	cache: DBCache<string> = new DBCache();

	constructor(database: Database) {
		this.database = database;
	}

	async createAccount(req: Request, res: Response) {
		let query = await this.database.pool.query(``);
	}
}
