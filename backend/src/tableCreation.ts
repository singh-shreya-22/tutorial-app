import PostgreSQLClient from "./postgresqlClient.ts";

const client = new PostgreSQLClient();

const query = `CREATE TABLE Authentication (
                id SERIAL PRIMARY KEY,
                userId UUID DEFAULT gen_random_uuid(),
                usermail VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`;

const deleteTableQuery = `DROP TABLE IF EXISTS Authentication;`; 
const getRowsQuery = `SELECT * FROM Authentication;`;
client.queryExecutor(getRowsQuery).then(result => {
    console.log('Operation successful', result);
}).catch(err => {
    console.error('Error creating table:', err);
});