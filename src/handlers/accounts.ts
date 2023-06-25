import { Request, Response } from "express";
import { Database } from "../database";
import { DBCache, createAccessToken, createSnowflake } from "../utils";

export interface UserInter {
	username: string;
	display_name: string;
	password: string;
}

export interface LoginAttempt {
	username_or_id: number;
	password: string;
}

export interface UserResponse {
	user_id: bigint;
	username: string;
	display_name: string;
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
	/**
	 * verifies a login and returns userinfo on successful login.
	 * @param req {Request<UserInter>} the request to handle while login.
	 * @param res {Response} responsehandler to use while sending response.
	 * @returns {Promise<UserResponse>} login info.
	 */
	async verifyLogin(req: Request, res: Response): Promise<UserResponse> {
		let queryRes = await this.database.pool.query(
			`
			SELECT * FROM users
			WHERE username = $1 
			OR user_id = $1
			`,
			[req.body.username_or_id]
		);
		if (!queryRes.rowCount) {
			res.sendStatus(404);
		} else {
			let user = queryRes.rows[0];
			return {
				user_id: user.user_id,
				username: user.username,
				display_name: user.display_name,
			};
		}
	}
}
