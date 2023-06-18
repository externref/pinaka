import { Database } from "../database";
import { DBCache } from "../utils";

export interface Shloka {
	adhyaya: Number;
	shloka: Number;
	speaker: String;
	original: String;
	romanised: String;
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
}
