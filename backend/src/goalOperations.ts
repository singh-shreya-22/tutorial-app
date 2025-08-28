import PostgreSQLClient from "./postgresqlClient.ts";
import { DatabaseError, BadRequestError } from "./error.ts";

interface GoalDetails{
    type: string,
    dailyCalories: number,
    currentWeight: number,
    targetWeight: number,
    userId: string
}

export default class GoalOperations{
    private dbClient: PostgreSQLClient;

    constructor(){
        this.dbClient = new PostgreSQLClient();
    }

    async handleGetGoal(userId: string): Promise<GoalDetails | null>{
        const query = `SELECT * FROM GoalDetails WHERE userid = $1`;
        const values = [userId]
        try{
            const result = await this.dbClient.queryExecutor(query, values);
            if(result.rows.length == 0){
                console.log("No goal details found for the user.")
                return null;
            }
            console.log("Successfully fetched goal details")
            const goalDetails : GoalDetails = {
                type: result.rows[0].type,
                dailyCalories: result.rows[0].dailycalories,
                currentWeight: result.rows[0].currentweight,
                targetWeight: result.rows[0].targetweight,
                userId: result.rows[0].userid

            }
            return goalDetails;
        }
        catch(error){
            console.log("error while getting goal details: ",error)
            throw new DatabaseError("Database error occured while getting goal details.", JSON.stringify(error))
        }
    }

    async handleSetGoal(type: string, dailyCalories: number, currentWeight: number, targetWeight: number, userId: string){
        // check if goal details already exist for the user
        if( await this.handleGetGoal(userId) != null){
            await this.handleUpdateGoal(type, dailyCalories, currentWeight, targetWeight, userId);
            return;
        }
        const query = `INSERT INTO GoalDetails (userid, type, dailycalories, currentweight, targetweight) VALUES ($1, $2, $3, $4, $5)`
        const values = [userId, type, dailyCalories, currentWeight, targetWeight];
        try {
            await this.dbClient.queryExecutor(query, values);
            console.log("Goal details saved successfully");
        } catch (error) {
            console.error("Error storing goal details: ", error);
            throw new DatabaseError("Database error occurred while setting goals", JSON.stringify(error));
        }
    }

    async handleUpdateGoal(type: string, dailyCalories: number, currentWeight: number, targetWeight: number, userId: string){
        const query = `UPDATE GoalDetails SET type = $1, dailycalories = $2, currentWeight = $3, targetWeight = $4 WHERE userid = $5`
        const values = [type, dailyCalories, currentWeight, targetWeight, userId];
        try {
            await this.dbClient.queryExecutor(query, values);
            console.log("Goal details updated successfully");
        } catch (error) {
            console.error("Error updating goal details: ", error);
            throw new DatabaseError("Database error occurred while updating goals:", JSON.stringify(error));
        }
    }
}