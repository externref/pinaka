import { Request, Response } from "express";
import { Database } from "../database";
import { DBCache, createAccessToken, createLoginCookie, createSnowflake } from "../utils";

export interface UserInter {
	username: string;
	display_name: string;
	password: string;
}

export interface LoginAttempt {
	username: string;
	password: string;
}

export interface UserResponse {
	avatar: string;
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
		let loginCookie = createLoginCookie();
		await this.database.pool.query(
			`
			INSERT INTO users
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			`,
			[
				createSnowflake(),
				req.body.username,
				req.body.username,
				req.body.avatar || "../../assets/om.png",
				req.body.password,
				createAccessToken(),
				loginCookie,
			]
		);
		res.send({
			username: req.body.username,
			display_name: req.body.display_name,
			avatar: req.body.avatar || "../../assets/om.png",
			cookie: loginCookie,
		});
	}
	/**
	 * verifies a login and returns userinfo on successful login.
	 * @param {Request<UserInter>} req the request to handle while login.
	 * @param {Response} res responsehandler to use while sending response.
	 */
	async verifyLogin(req: Request<LoginAttempt>, res: Response) {
		let queryRes = await this.database.pool.query(
			`
			SELECT * FROM users
			WHERE username = $1 
			AND passwd = $2
			`,
			[req.body.username, req.body.password]
		);
		if (!queryRes.rowCount) {
			res.sendStatus(403);
		} else {
			let user = queryRes.rows[0];
			let newToken: string = createAccessToken();
			res.cookie("access_token", newToken, { expires: new Date(Date.now() + 900000) });
			await this.database.pool.query(
				"UPDATE users SET current_login_token = $1 WHERE user_id = $2",
				[newToken, user.user_id]
			);
			res.send({
				avatar: user.avatar,
				username: user.username,
				display_name: user.display_name,
				cookie: newToken,
			});
		}
	}

	async verifyCookie(req: Request, res: Response) {
		let queryRes = await this.database.pool.query(
			`
			SELECT * FROM users
			WHERE current_login_token = $1
			`,
			[req.body.cookie]
		);
		if (!queryRes.rowCount) {
			res.sendStatus(403);
		} else {
			let user = queryRes.rows[0];
			res.send({
				avatar: user.avatar,
				username: user.username,
				display_name: user.display_name,
			});
		}
	}
}
