import pg, {Client, Pool} from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const query = `
            CREATE TABLE mealNutritions (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                quantity INT NOT NULL,
                units VARCHAR(50) NOT NULL,
                calories INT NOT NULL,
                protein INT NOT NULL,
                carbs INT NOT NULL,
                fat INT NOT NULL
            );`;

const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST_URL,
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : undefined,
    database: process.env.POSTGRES_DATABASE_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
    },
})

const queryAuthTable = `
            CREATE TABLE Authentication (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,s
                CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`;


async function executeQuery(query: string, values: any[] = [], client: pg.Client): Promise<void> {
    client.connect(function (err) {
        if (err){
            console.error('Connectiosn error', err.stack);
            throw err;
        }
        client.query(query, values, function (err, result) {
            if (err){
                console.error('Error while exceuting the query', err.stack);
                throw err;
            }
            console.log(result);
            client.end(function (err) {
                if (err){
                    console.error('Connection closing error', err.stack);
                    throw err;
                }
            });
        });
    });
}

export async function storeUserCredentials(username: string, password: string,): Promise<void> {
    const query = `INSERT INTO Authentication (username, password) VALUES ($1, $2)`;
    const values = [username, password];
}


export async function getMealNutritionInfo(mealName: string, quantity: number, unit: string, client: pg.Client): Promise<any> {
    const query = `SELECT * FROM mealNutritions WHERE name = $1 AND units = $2`;
    const values = [mealName, unit];
    
}

export async function createMealNutritionInfoRecord(client: pg.Client, mealName: string, unit: string): Promise<void> {
    const query = `INSERT INTO mealNutritions (name, quantity, units, calories, protein, carbs, fat) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const values = [mealName, 1, unit, 0, 0, 0, 0];
    
}

executeQuery(queryAuthTable, [], client);