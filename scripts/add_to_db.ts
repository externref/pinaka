import { Pool } from "pg";
import * as adhyaya1 from "../bin/gita/adhyaya1.json"
import {readFileSync} from "node:fs"


const connectionString = process.env.PGSQL_URI;
async function ad1() {
    const pool = connectionString ? new Pool({ connectionString }) : new Pool({
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "sarthak",
        database: "postgres"
    })
    let data = readFileSync("schemas/table_setups.sql")
    await pool.query(data.toString());
    for (let i = 1; i < 48; i++) {
        console.log(i)
        let shloka = adhyaya1[i]
        pool.query(
            `
            INSERT INTO bhagavadgita
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [1, i, shloka.speaker, shloka.original, shloka.romanised, "pending translation", "pending translation"]
        )
    }
}

ad1()