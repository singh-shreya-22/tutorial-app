import PostgreSQLClient  from "./postgresqlClient.ts";
import bcrypt from 'bcrypt';
import { BadRequestError, DatabaseError } from "./error.ts";
import {v4 as uuidv4} from 'uuid';

export default class AuthenticationOperations{
    private dbClient: PostgreSQLClient;

    constructor() {
        this.dbClient = new PostgreSQLClient();
    }

    async handleSignInRequest(username: string, password: string): Promise<[Boolean, String, String, String]> {
        if(!username || !password) {
            throw new BadRequestError("Username and password are required");
        }
        return await this.checkUserCredentials(username, password);
    }

    async handleSignUpRequest(usermail: string, password: string, username: string): Promise<String> {
        console.log("Started handling the sign up request..")
        if(!usermail || !password || !username) {
            console.log("Username, email and Password not present.")
            throw new BadRequestError("Username, email and password are required");
        }
        if(await this.checkIfUserExists(usermail)) {
            console.log("User email already exists.")
            throw new BadRequestError("User email already exists");
        }
        console.log("User email does not exists, creating a new user")
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const query = `INSERT INTO Authentication (userId, usermail, username, password) VALUES ($1, $2, $3, $4)`;
        const guid = uuidv4();
        const values = [guid, usermail, username, hashedPassword];
        try {
            await this.dbClient.queryExecutor(query, values);
            console.log("User credentials stored successfully");
            return guid;
        } catch (error) {
            console.error("Error storing user credentials:", error);
            throw new DatabaseError("Database error occurred while storing credentials", JSON.stringify(error));
        }
    }

    async checkUserCredentials(usermail: string, password: string): Promise<[Boolean, String, String, String]> {
        const query = `SELECT userid, username, password FROM Authentication WHERE usermail = $1`;
        const values = [usermail];
        try {
            const result = await this.dbClient.queryExecutor(query, values);
            if (result.rows.length === 0) {
                console.log("User not found");
                return [false, "", "", "User not found"]; // User not found
            }
            const hashedPassword = result.rows[0].password;
            const userId = result.rows[0].userId;
            const username = result.rows[0].username;
            const isMatch = await bcrypt.compare(password, hashedPassword); 
            if (isMatch) {
                console.log("Authentication successful");
                return [true, userId, username, "Authentication successful"]; // Password matches
            }
            return [false, "", "", "Invalid password"]; // Password does not match
        } catch (error) {
            console.error("Error checking user credentials:", error);
            throw new Error("Database error occurred while checking credentials");
        }
    }

    async checkIfUserExists(usermail: string): Promise<boolean> {
        console.log("Checking if user exists..")
        const query = `SELECT COUNT(*) FROM Authentication WHERE usermail = $1`;
        const values = [usermail];  
        try {
            const result = await this.dbClient.queryExecutor(query, values);
            return result.rows[0].count > 0; // Returns true if user exists
        } catch (error) {
            console.error("Error checking if user exists:", error);
            throw new DatabaseError("Database error occurred while checking user existence", JSON.stringify(error));
        }   
        
    }
}


