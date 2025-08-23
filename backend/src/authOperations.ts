import PostgreSQLClient  from "./postgresqlClient.ts";
import bcrypt from 'bcrypt';

export default class AuthenticationOperations{
    private dbClient: PostgreSQLClient;

    constructor() {
        this.dbClient = new PostgreSQLClient();
    }

    async handleSignInRequest(username: string, password: string): Promise<[Boolean, String, String]> {
        if(!username || !password) {
            throw new Error("Username and password are required");
        }
        return await this.checkUserCredentials(username, password);
    }

    async handleSignUpRequest(username: string, password: string): Promise<void> {
        if(!username || !password) {
            throw new Error("Username and password are required");
        }
        if(await this.checkIfUserExists(username)) {
            throw new Error("Username already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const query = `INSERT INTO Authentication (username, password) VALUES ($1, $2)`;
        const values = [username, hashedPassword];
        try {
            await this.dbClient.queryExecutor(query, values);
            console.log("User credentials stored successfully");
        } catch (error) {
            console.error("Error storing user credentials:", error);
            throw new Error("Database error occurred while storing credentials");
        }
    }

    async checkUserCredentials(username: string, password: string): Promise<[Boolean, String, String]> {
        const query = `SELECT password FROM Authentication WHERE username = $1`;
        const values = [username];
        try {
            const result = await this.dbClient.queryExecutor(query, values);
            if (result.rows.length === 0) {
                console.log("User not found");
                return [false, "", "User not found"]; // User not found
            }
            const hashedPassword = result.rows[0].password;
            const userId = result.rows[0].userId;
            const isMatch = await bcrypt.compare(password, hashedPassword); 
            if (isMatch) {
                console.log("Authentication successful");
                return [true, userId, "Authentication successful"]; // Password matches
            }
            return [false, "", "Invalid password"]; // Password does not match
        } catch (error) {
            console.error("Error checking user credentials:", error);
            throw new Error("Database error occurred while checking credentials");
        }
    }

    async checkIfUserExists(username: string): Promise<boolean> {
        const query = `SELECT COUNT(*) FROM Authentication WHERE username = $1`;
        const values = [username];  
        try {
            const result = await this.dbClient.queryExecutor(query, values);
            return result.rows[0].count > 0; // Returns true if user exists
        } catch (error) {
            console.error("Error checking if user exists:", error);
            throw new Error("Database error occurred while checking user existence");
        }   
    }
}

