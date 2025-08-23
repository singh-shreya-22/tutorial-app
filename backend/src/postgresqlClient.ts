import * as fs from 'fs';
import * as pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

export default class PostgreSQLClient {
    private client: pg.Client;

    constructor() {
        this.client = new Client({
            user: 'avnadmin' ,
            password: 'AVNS_VCYfhVxb6iefC2rKTVE',
            host: 'nutritrack-postgres-nutritrack-health-43.g.aivencloud.com',
            port: 26554,
            database: 'defaultdb',
            ssl: {
                rejectUnauthorized: false,
                ca: fs.readFileSync('./ca.pem').toString(),
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

