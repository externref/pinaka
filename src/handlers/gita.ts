import { Database } from "../database";
import { DBCache } from "../utils";

export interface Shloka {
	adhyaya: Number;
	shloka: Number;
	original: String;
	hindi: String;
	english: String;
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
	 *
	 * @param {Number} adhyaya the adhyaya to look into.
	 * @param {Number} shloka the shloka to look up for.
	 * @returns {Shloka} data of the shloka.
	 */
	async getShloka(adhyaya: Number, shloka: Number): Promise<Shloka> {
		let _shloka = await this.database.getGitaShloka(adhyaya, shloka);
		return _shloka;
	}
}
