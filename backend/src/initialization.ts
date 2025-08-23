import fs from 'fs';
import pg, {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();


export function initializeDatabase(): pg.Pool {
    // setup PostgreSQL client configuration
    const config = {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST_URL,
        port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : undefined,
        database: process.env.POSTGRES_DATABASE_NAME,
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync('./src/certificate.pem').toString(),
        },
    };

    return new pg.Pool(config);
}


