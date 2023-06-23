import { Pool } from "pg";
import dotenv from "dotenv";
import { Shloka } from "./handlers/gita";
dotenv.config();

const connectionString = process.env.PGSQL_URI;

export class Database {
	pool: Pool;

	constructor() {
		this.pool = new Pool({ connectionString });
	}

	async setup() {
		await this.pool.query(
			`
            CREATE TABLE IF NOT EXISTS bhagavadgita (
                adhyaya INT NOT NULL, 
                shloka INT NOT NULL, 
				speaker VARCHAR NOT NULL,
                original VARCHAR NOT NULL,
				romanised VARCHAR NOT NULL,
                hindi VARCHAR NOT NULL, 
                english VARCHAR NOT NULL
            )
            `
		);
	}
	/**
	 * Get's a gita query from database.
	 * @param {Number} adhyaya the adhyaya to get shloka from.
	 * @param {Number} shloka the number of shloka.
	 * @returns {Promise<Shloka>}
	 */
	async getGitaShloka(adhyaya: Number, shloka: Number): Promise<Shloka> {
		let query = await this.pool.query(
			`
            SELECT * FROM bhagavadgita 
            WHERE adhyaya = $1 AND shloka = $2
            `,
			[adhyaya, shloka]
		);
		return query.rows[0];
	}
	/**
	 * adds a gita shloka to the database.
	 * @param {Shloka} data the shloka data to add to database.
	 */
	async addGitaShloka(data: Shloka) {
		console.log("here");
		await this.pool.query(
			`
			
			INSERT INTO bhagavadgita
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			`,
			[
				data.adhyaya,
				data.shloka,
				data.speaker,
				data.original,
				data.romanised,
				data.hindi,
				data.english,
			]
		);
		console.log("done!");
	}
}
