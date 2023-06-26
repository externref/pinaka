import { Request, Response } from "express";
import { Database } from "../database";

export class ManasHandler {
	database: Database;
	constructor(database: Database) {
		this.database = database;
	}
}
