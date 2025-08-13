import type NutritionalInfo from "./Nutritionals";

export default interface MealRecommendations {
    meal: string,
    suggestion: string,
    nutritionalInfo: NutritionalInfo
}