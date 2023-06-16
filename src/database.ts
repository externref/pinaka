import { Client, Pool, QueryResult } from "pg";
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
                original VARCHAR NOT NULL,
                hindi VARCHAR NOT NULL, 
                english VARCHAR NOT NULL
            )
            `
		);
	}
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
}
