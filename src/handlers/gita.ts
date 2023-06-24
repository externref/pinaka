import { Request, Response } from "express";
import { Database } from "../database";
import { DBCache } from "../utils";

export const numShlokas = {
	1: 47,
	2: 72,
	3: 43,
	4: 42,
	5: 29,
	6: 47,
	7: 30,
	8: 28,
	9: 34,
	10: 42,
	11: 55,
	12: 20,
	13: 35,
	14: 27,
	15: 20,
	16: 24,
	17: 28,
	18: 78,
};

export interface Shloka {
	adhyaya: Number;
	shloka: Number;
	speaker: String;
	original: String;
	romanised: String;
	hindi: String;
	english: String;
}

export interface GitaQuery {
	query: string;
	before: number | undefined;
	after: number | undefined;
}

/**
 * handler for gita queries
 * this class contains all methods useful for bhagavadgita endpoints.
 */
export class GitaHandler {
	database: Database;

	constructor(database: Database) {
		this.database = database;
	}
	/**
	 * cache for storing data fetched from database.
	 */
	cache: DBCache<Shloka> = new DBCache();

	/**
	 * gets a shloka from the cache, if not found database lookup is done and
	 * shloka is returned.
	 * @param {Number} adhyaya the adhyaya to look into.
	 * @param {Number} shloka the shloka to look up for.
	 * @returns {Shloka} data of the shloka.
	 */
	async getShloka(adhyaya: Number, shloka: Number): Promise<Shloka> {
		let _cache_shloka: Shloka | undefined = this.cache.get(`${adhyaya}_${shloka}`);
		if (_cache_shloka != undefined) return _cache_shloka;
		else {
			let _shloka = await this.database.getGitaShloka(adhyaya, shloka);
			this.cache.push(`${_shloka.adhyaya}_${_shloka.shloka}`, _shloka);
			return _shloka;
		}
	}

	async query(req: Request<GitaQuery>, res: Response) {
		let query = this.database.pool.query(
			`
			SELECT * FROM bhagavadgita
			WHERE ($1 IN original OR $1 IN romanised)
			AND adhyaya > $2 AND adhyaya < $3
			`,
			[req.body.query, req.body.after, req.body.before]
		);
	}
}
