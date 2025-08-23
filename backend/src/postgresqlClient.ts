import { Pool } from "pg";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST_URL,
  port: 26554,
  database: process.env.POSTGRES_DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync("./src/certificate.pem").toString(),
  },
});

export default class PostgreSQLClient {
  public async queryExecutor(query: string, values: any[] = []) {
    try {
      const result = await pool.query(query, values);
      return result;
    } catch (err) {
      console.error("Error executing query", err);
      throw err;
    }
  }
}
