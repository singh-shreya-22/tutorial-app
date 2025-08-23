import * as fs from 'fs';
import * as pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

export default class PostgreSQLClient {
    private client: pg.Client;

    constructor() {
        this.client = new Client({
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST_URL,
            port: 26554,
            database: process.env.POSTGRES_DATABASE_NAME,
            ssl: {
                rejectUnauthorized: false,
                ca: fs.readFileSync('./src/ca.pem').toString(),
            },
        });
    }

    public async queryExecutor(query: string, values: any[] = []): Promise<pg.QueryResult> {
        try {
            await this.client.connect();
            const result = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.error('Error executing query', err);
            throw err;
        } finally {
            await this.client.end();
        }
    }
}

